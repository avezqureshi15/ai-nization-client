import "./suggestion-chips.css"
type Suggestion = {
  label: string;
  action: string;
};

const SuggestionChips = ({
  suggestions,
  onClick,
}: {
  suggestions: Suggestion[];
  onClick: (action: string) => void;
}) => {
  return (
    <div className="chip-row">
      {suggestions.map((s, i) => (
        <button
          key={i}
          className="suggestion-chip"
          onClick={() => onClick(s.action)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;