import React, { useEffect, useRef, useState } from "react";

import UserMessage from "../../../../components/ui/user-message/user-message";
import SuggestionChips from "../suggestion-chips/suggestion-chips";

import { renderBlock } from "./block-renderer/block-factory";
import type { ContentBlock } from "./chart-area.type";
import type { Message, AIMessage, Suggestion } from "../../pages/chat.type";
import { useChatStore } from "../../../../store/chat.store";


const ChatArea: React.FC = () => {
  const { messages, hasStarted } = useChatStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 120;
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setAutoScroll(isNearBottom);
  };

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  const hasSuggestions = (
    msg: Message
  ): msg is AIMessage & { suggestions: Suggestion[] } => {
    return msg.role === "ai" && Array.isArray((msg as AIMessage).suggestions);
  };

  const getTextFromBlock = (block: ContentBlock): string | undefined => {
    if (block.type === "text" || block.type === "thinking") return block.text;
    return undefined;
  };

  if (!hasStarted) return null;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ flex: 1, overflowY: "auto", padding: "20px 0" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.role === "user" ? (
              <UserMessage text={getTextFromBlock(msg.content[0]) ?? ""} />
            ) : (
              <span className="mb-10">
                {msg.content.map((block, i) => renderBlock(block, i))}

                {hasSuggestions(msg) && (
                  <div className="chip-row">
                    <SuggestionChips
                      suggestions={msg.suggestions}
                      onClick={(action) => {
                        console.log("suggestion clicked:", action);
                      }}
                    />
                  </div>
                )}
              </span>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatArea;