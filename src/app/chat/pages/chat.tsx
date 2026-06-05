import { useState, useEffect } from "react";
import "./chat.css";

import { HISTORY_EARLIER, HISTORY_TODAY } from "../../../constants/constants";
import { Icon } from "../../../components/ui/icons";
import Header from "../../../components/ui/header/header";
import ChatArea from "../components/chat-area/chat-area";
import ChatInput from "../../../components/ui/chat-input/chat-input";
import Sidebar from "../../../components/ui/sidebar/sidebar";
import Waveform from "../../../assets/wave-form/wave-form";

/* ───────────────── TYPES ───────────────── */

export type Message =
  | { id: number; type: "text"; role: "user" | "ai"; text: string }
  | { id: number; type: "timeline"; steps: string[]; currentStep: number }
  | { id: number; type: "thinking"; text: string };

/* ───────────────── MOCK FLOW ───────────────── */

const mockConversation: Message[] = [
  { id: 1, role: "user", type:"text", text: "Hey, we need to hire a candidate" },
  { id: 2, role: "ai",  type:"text", text: "Sure. Let me know what role you are hiring" },
  { id: 3, role: "user",  type:"text", text: "We are looking for Senior React JS Developer" },
];


/* ───────────────── COMPONENT ───────────────── */

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


const startAIThinking = () => {
  const steps = [
    "Understanding role...",
    "Analyzing seniority...",
    "Drafting job description...",
    "Finalizing...",
  ];

  let stepIndex = 0;
  const thinkingId = Date.now();

  // push initial thinking
  setMessages((prev) => [
    ...prev,
    {
      id: thinkingId,
      type: "thinking",
      text: steps[0],
    },
  ]);

  const interval = setInterval(() => {
    stepIndex++;

    if (stepIndex < steps.length) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId && msg.type === "thinking"
            ? { ...msg, text: steps[stepIndex] }
            : msg
        )
      );
    } else {
      clearInterval(interval);

      // remove thinking chip
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== thinkingId)
      );

      // final AI message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "text",
            role: "ai",
            text: "Here is the Job Description for Senior React Developer...",
          },
        ]);
      }, 500);
    }
  }, 1000);
};
  /* ───────────────── AUTO FLOW ───────────────── */

useEffect(() => {
  let index = 0;

  const interval = setInterval(() => {
    const nextMessage = mockConversation[index];

    if (!nextMessage) {
      clearInterval(interval);

      // 🔥 inject timeline AFTER conversation
      startAIThinking();

      return;
    }

    setMessages((prev) => [
      ...prev,
      { ...nextMessage, type: "text" },
    ]);

    setHasStartedChat(true);
    index++;
  }, 1200);

  return () => clearInterval(interval);
}, []);
  /* ───────────────── SEND HANDLER ───────────────── */

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setHasStartedChat(true);
    setInput("");

    // fake AI reply
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: "This is a mock AI reply...",
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  /* ───────────────── UI ───────────────── */

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
          messages={messages}
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