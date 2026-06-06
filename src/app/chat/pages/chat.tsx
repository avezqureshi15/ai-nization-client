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
import type { Message } from "./chat.type";

const USER_SCRIPT = [
  "We need to hire someone",
  "Senior React Developer for product based company",
  "Add system design responsibility and make it more senior",
  "Also include mentoring juniors and microfrontend experience",
  "Make it little bit lengthy and quite formatted",
  "This looks good, finalize it",
];

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const handleSend = async (text: string, depth: number) => {
    setHasStartedChat(true);

    await processUserMessage({
      text,
      depth,
      onUpdate: setMessages,
    });
  };

  useEffect(() => {
    const runScript = async () => {
      for (let i = 0; i < USER_SCRIPT.length; i++) {
        await new Promise((r) => setTimeout(r, 1000 + i * 150));
        await handleSend(USER_SCRIPT[i], i);
      }
    };

    runScript();
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

        <ChatArea
          hasStartedChat={hasStartedChat}
          messages={messages}
        />
        {hasStartedChat && (
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