import React from "react";
import "./mode-button.css";

const ModeButton = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <button className="mode-btn">
      Fast {icon}
    </button>
  );
};

export default ModeButton;