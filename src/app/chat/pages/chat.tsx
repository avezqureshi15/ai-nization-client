import { useState, useEffect } from "react";
import "./chat.css";

import { Icon } from "../../../components/ui/icons";
import ChatArea from "../components/chat-area/chat-area";
import ChatInput from "../../../components/ui/chat-input/chat-input";
import Waveform from "../../../assets/wave-form/wave-form";

import { processUserMessage } from "../engine/chat-engine";

import { useChatStore } from "../../../store/chat.store";
import { useScriptStore } from "../../../store/script.store";

export default function Chat() {
  const [input, setInput] = useState("");

  const { messages, hasStarted, setStarted } = useChatStore();

  const { start, getNext } = useScriptStore();

  const handleSend = async (text: string, depth: number) => {
    await processUserMessage(text, depth);

    // AFTER AI completes → load next scripted input
    const nextText = getNext();

    if (nextText) {
      setInput(nextText);
    }
  };


  useEffect(() => {
    setStarted();

    start();

    const first = getNext();
    if (first) setInput(first);
  }, []);

  return (
    <>
      {/* FULLY reactive from store */}
      <ChatArea onSend={handleSend} />

      {hasStarted && (
        <ChatInput
          mounted={false}
          input={input}
          setInput={setInput}
          onSend={() => {
            if (!input.trim()) return;

            handleSend(input, messages.length);
            setInput("");
          }}
          Icon={Icon}
          Waveform={Waveform}
        />
      )}
    </>
  );
}