import { create } from "zustand";

const SCRIPT = [
  "We need to hire someone",
  "Senior React Developer for product based company",
  "Add system design responsibility and make it more senior",
  "Also include mentoring juniors and microfrontend experience",
  "Make it little bit lengthy and quite formatted",
  "This looks good, finalize it",
];

type ScriptState = {
  script: string[];
  index: number;
  running: boolean;

  start: () => void;
  getNext: () => string | null;
};

export const useScriptStore = create<ScriptState>((set, get) => ({
  script: SCRIPT,
  index: 0,
  running: false,

  start: () => set({ running: true, index: 0 }),

  getNext: () => {
    const { script, index } = get();

    if (index >= script.length) return null;

    const value = script[index];

    set({ index: index + 1 });

    return value;
  },
}));