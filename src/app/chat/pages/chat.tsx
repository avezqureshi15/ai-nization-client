import { useState, useEffect } from "react";
import "./chat.css";

import { HISTORY_EARLIER, HISTORY_TODAY } from "../../../constants/constants";
import { Icon } from "../../../components/ui/icons";
import Header from "../../../components/ui/header/header";
import ChatArea from "../components/chat-area/chat-area";
import ChatInput from "../../../components/ui/chat-input/chat-input";
import Sidebar from "../../../components/ui/sidebar/sidebar";
import Waveform from "../../../assets/wave-form/wave-form";

import { processUserMessage } from "./chat-engine";

import { useChatStore } from "../../../store/chat.store";
import { useScriptStore } from "../../../store/script.store";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");

  const { messages, hasStarted ,setStarted} = useChatStore();

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
    <div className="chat-root">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        HISTORY_TODAY={HISTORY_TODAY}
        HISTORY_EARLIER={HISTORY_EARLIER}
        Icon={Icon}
      />

      <main className="chat-main">
        <Header
          mounted={false}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          Icon={Icon}
        />

        {/* FULLY reactive from store */}
        <ChatArea />

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
      </main>
    </div>
  );
}