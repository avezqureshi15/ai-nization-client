import React from "react";
import UserMessage from "../../../../components/ui/user-message/user-message";
import AIMessage from "../../../../components/ui/ai-message/ai-message";
import Timeline from "../timeline/timeline";
import type { Message } from "../../pages/chat";
import ThinkingChip from "../thinking/thinking";


type Props = {
  hasStartedChat: boolean;
  messages: Message[];
};

const ChatArea: React.FC<Props> = ({ hasStartedChat, messages }) => {
  if (!hasStartedChat) {
    return (
      <></>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 0" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
        {messages.map((msg) => {
          if (!msg) return null;

          if (msg.type === "timeline") {
            return (
              <Timeline key={msg.id} steps={msg.steps} currentStep={msg.currentStep} />
            );
          }

          if (msg.type === "thinking") {
            return (
               <ThinkingChip key={msg.id} text={msg.text} />
            );
          }

          return msg.role === "user" ? (
            <UserMessage key={msg.id} text={msg.text} />
          ) : (
            <AIMessage key={msg.id} message={msg.text} />
          );
        })}
      </div>
    </div>
  );
};

export default ChatArea;