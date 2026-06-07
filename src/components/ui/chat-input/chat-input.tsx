import React from "react";
import Input from "../input/input";
import SendButton from "../send-button/send-button";

import "./chat-input.css";
import ModeButton from "../mode-button/mode-button";
import type { ChatInputProps, InputActionsProps } from "./chat-input.type";
import { useMentionEngine } from "../../shared/mentions/use-mention-engine";
import MentionPopup from "../../shared/mentions";

/* ───────────────── TYPES ───────────────── */


/* ───────────────── SUB COMPONENTS ───────────────── */

const InputActions: React.FC<InputActionsProps> = ({
  Icon,
  Waveform,
  onSend,
}) => {
  return (
    <div className="chat-input-actions">
      <ModeButton icon={<Icon.Chevron />} />

      <button className="chat-input-mic">
        <Icon.Mic />
      </button>

      <SendButton onClick={onSend}>
        <Waveform />
      </SendButton>
    </div>
  );
};

/* ───────────────── MAIN ───────────────── */

const ChatInput: React.FC<ChatInputProps> = ({
  mounted = true,
  input,
  setInput,
  Icon,
  Waveform,
  onSend,
}) => {
  const {
    show,
    data,
    activeTrigger,
    handleChange,
    handleSelect,
  } = useMentionEngine();
  return (
    <div className={`cui-fade-up cui-d3${mounted ? "" : " opacity-0"}`}>
      <div className="chat-input-root">
        <div className="chat-input-container">

          <div className="chat-input-wrapper">
            {/* Left icon */}
            {Icon && (
              <button className="chat-input-icon-btn">
                <Icon.Plus />
              </button>
            )}

            {/* Input */}
            <Input
              value={input}
              onChange={(val: string) => {
                setInput(val);
                handleChange(val, val.length); // 👈 inject here
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") onSend();
              }}
            />

            <MentionPopup
              show={show}
              data={data}
              activeTrigger={activeTrigger}
              onSelect={(item) =>
                handleSelect(item, input, setInput)
              }
            />

            {/* Right actions */}
            {Icon && Waveform && (
              <InputActions
                Icon={Icon}
                Waveform={Waveform}
                onSend={onSend}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatInput;