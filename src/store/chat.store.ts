import { create } from "zustand";
import type { Message } from "../app/chat/pages/chat.type";

type ChatState = {
  messages: Message[];
  hasStarted: boolean;

  addMessage: (msg: Message) => void;
  updateMessage: (id: number, updater: (msg: Message) => Message) => void;
  setStarted: () => void;
  reset: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  hasStarted: false,

  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),

  updateMessage: (id, updater) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? updater(m) : m
      ),
    })),

  setStarted: () => set({ hasStarted: true }),

  reset: () => set({ messages: [], hasStarted: false }),
}));