import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

type DropdownProps = {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const Dropdown = ({
  options,
  defaultValue,
  onChange,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    defaultValue || options[0]
  );

  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setValue(val);
    setOpen(false);
    onChange?.(val);
  };

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="dropdown-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="dropdown-value">{value}</span>
        <span className={`dropdown-icon ${open ? "open" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`dropdown-item ${
                opt === value ? "active" : ""
              }`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;