import { Icon } from "../../../../components/ui/icons";
import "./thinking.css";

type Props = {
    text: string;
};

const ThinkingChip: React.FC<Props> = ({ text }) => {
    return (
        <div className="cui-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "5px 12px", borderRadius: "8px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "16px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "12.5px",
            width:"50%"
        }}>
            <Icon.Thought />
            <span>{text}</span>
        </div>
    );
};

export default ThinkingChip;