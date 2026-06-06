import React from "react";
import "./text-area.css";

type Props = {
  subject?: string;
  name?: string;
  meta?: string;
};

const Divider = () => <div className="rl-divider" />;

const Highlight: React.FC<{ children: React.ReactNode; block?: boolean }> = ({
  children,
  block,
}) => (
  <span className={`rl-highlight ${block ? "block" : ""}`}>
    {children}
  </span>
);

const TextArea: React.FC<Props> = ({
  subject = "Request regarding [Purpose]",
  name = "[Your Name]",
  meta = "[Class / Department / Roll Number]",
}) => {
  return (
    <div className="rl-container">
      <div className="rl-card">
        {/* Top Actions */}
        <div className="rl-actions">
          <button className="rl-icon-btn">
            <i className="ti ti-pencil" />
          </button>

          <div className="rl-actions-right">
            <button className="rl-icon-btn">
              <i className="ti ti-copy" />
            </button>
            <button className="rl-icon-btn">
              <i className="ti ti-send" />
            </button>
          </div>
        </div>

        {/* Subject */}
        <p className="rl-subject">{subject}</p>

        <Divider />

        {/* Body */}
        <p className="rl-text">Respected Sir/Madam,</p>
        <p className="rl-text">I hope you are doing well.</p>

        <p className="rl-text">
          I am writing to bring to your attention regarding{" "}
          <Highlight>
            [clearly state your purpose—leave request / permission / issue /
            application]
          </Highlight>
          .
        </p>

        <p className="rl-text">
          [Explain your situation briefly and clearly. Keep it factual and
          respectful.]
        </p>

        <p className="rl-text">
          Example: I would like to request leave from [start date] to{" "}
          <Highlight>[end date]</Highlight> due to{" "}
          <Highlight>[reason]</Highlight>.
        </p>

        <p className="rl-text">
          I kindly request you to consider my request and grant me the necessary
          permission.
        </p>

        <p className="rl-text">Thank you for your time and understanding.</p>

        <p className="rl-text">Yours sincerely,</p>

        <Highlight block>{name}</Highlight>
        <br />
        <Highlight block>{meta}</Highlight>
      </div>
    </div>
  );
};

export default TextArea;