import React from "react";


import "./chat-area.css";
import EmptyState from "../empty-state/empty-state";
import UserMessage from "../../../../components/ui/user-message/user-message";
import AIMessage from "../../../../components/ui/ai-message/ai-message";
import { ACTION_BTNS } from "../../../../constants/constants";
import type { ChatAreaProps } from "./chart-area.type";



const ChatArea: React.FC<ChatAreaProps> = ({
  hasStartedChat,
  input,
  setInput,
  handleSend,
}) => {
  return (
    <div className="chat-area">
      <div className="chat-area-container">
        {!hasStartedChat ? (
          <EmptyState
            input={input}
            setInput={setInput}
            onSend={handleSend}
          />
        ) : (
          <>
            <UserMessage text="hey dude" />
            <AIMessage
              thought="Thought for 2s"
              message="Hey dude! What's good? 🚀"
              actions={ACTION_BTNS}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;