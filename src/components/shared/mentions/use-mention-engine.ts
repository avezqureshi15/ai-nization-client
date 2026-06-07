// useMentionEngine.ts
import { useState } from "react";
import { fetchMockRecruitments, fetchMockUsers } from "./mock-api";

const TRIGGERS = {
  "@": fetchMockUsers,
  "#": fetchMockRecruitments,
};

type TriggerType = "@" | "#";


export const useMentionEngine = () => {
 const [activeTrigger, setActiveTrigger] = useState<TriggerType | null>(null);

  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  const handleChange = async (value: string, cursorPos: number) => {
    const textUntilCursor = value.slice(0, cursorPos);
    const match = textUntilCursor.match(/([@#])(\w*)$/);

    if (match) {
      const trigger = match[1] as TriggerType;
      const q = match[2];

      setActiveTrigger(trigger);
      setQuery(q);
      setShow(true);

      const fetcher = TRIGGERS[trigger as "@" | "#"];
      const result = await fetcher(q);
      setData(result);
    } else {
      setShow(false);
      setActiveTrigger(null);
    }
  };

  const handleSelect = (
    item: any,
    value: string,
    setValue: (v: string) => void
  ) => {
    const newText = value.replace(/([@#])(\w*)$/, () => {
      if (activeTrigger === "@") return `@${item.name} `;
      if (activeTrigger === "#") return `#${item.title} `;
      return "";
    });

    setValue(newText);
    setShow(false);
  };

  return {
    show,
    data,
    activeTrigger,
    handleChange,
    handleSelect,
  };
};