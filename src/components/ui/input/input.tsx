import React from "react";
import "./input.css";
import type { InputProps } from "./input.type";



const Input: React.FC<InputProps> = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Ask anything"
    />
  );
};

export default Input;