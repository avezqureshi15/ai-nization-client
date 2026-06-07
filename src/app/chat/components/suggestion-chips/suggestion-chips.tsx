import { useChatStore } from "../../../../store/chat.store";
import "./suggestion-chips.css";

type Suggestion = {
  label: string;
  action: string;
};

type SuggestionChipsProps = {
  suggestions: Suggestion[];
  onSend: (text: string,depth:number) => void | Promise<void>;
};

const SuggestionChips = ({
  suggestions,
  onSend,
}: SuggestionChipsProps) => {
    const { messages} = useChatStore();
  
  return (
    <div className="chip-row">
      {suggestions.map((s, i) => (
        <button
          key={i}
          className="suggestion-chip"
          onClick={() => onSend(s.label,messages.length)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;