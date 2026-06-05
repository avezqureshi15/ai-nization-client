import { useState } from "react";
import "./chat.css";

import { HISTORY_EARLIER, HISTORY_TODAY } from "../../../constants/constants";
import { Icon } from "../../../components/ui/icons";
import Header from "../../../components/ui/header/header";
import ChatArea from "../components/chat-area/chat-area";
import ChatInput from "../../../components/ui/chat-input/chat-input";
import Sidebar from "../../../components/ui/sidebar/sidebar";
import Waveform from "../../../assets/wave-form/wave-form";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    console.log("Sending:", input);

    setHasStartedChat(true);
    setInput("");
  };

  return (
    <div className="chat-root">
      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        HISTORY_TODAY={HISTORY_TODAY}
        HISTORY_EARLIER={HISTORY_EARLIER}
        Icon={Icon}
      />

      {/* MAIN */}
      <main className="chat-main">
        <Header
          mounted={false}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          Icon={Icon}
        />

        <ChatArea
          hasStartedChat={hasStartedChat}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />

        {hasStartedChat && (
          <ChatInput
            mounted={false}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            Icon={Icon}
            Waveform={Waveform}
          />
        )}
      </main>
    </div>
  );
}