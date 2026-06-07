import { useEffect, useRef, useState } from "react";
import "./add-remark-modal.css";

export default function AddRemarkModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => ref.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="remark-overlay" onClick={onClose}>
      <div className="remark-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="remark-header">
          <div className="title">
            <i className="bx bx-notepad"></i>
            <span>Add Remark</span>
          </div>

          <button className="close-btn" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        {/* BODY */}
        <div className="remark-body">
          <textarea
            ref={ref}
            className="remark-input"
            placeholder="Write detailed candidate notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* FOOTER */}
        <div className="remark-footer">
          <div className="hint">
            <i className="bx bx-info-circle"></i>
            Internal hiring notes only
          </div>

          <div className="actions">
            <button className="ghost" onClick={onClose}>
              Cancel
            </button>

            <button
              className="primary"
              onClick={() => {
                if (!text.trim()) return;
                onSave(text);
                setText("");
                onClose();
              }}
            >
              Save Remark
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}