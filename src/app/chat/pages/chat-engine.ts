import { getAIResponse } from "../../../services/ai-services";
import type { Message } from "./chat.type";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const getAIDelay = (text: string, depth: number) =>
  Math.min(1500, 400 + text.length * 15 + depth * 120);

export const processUserMessage = async ({
  text,
  depth,
  onUpdate,
}: {
  text: string;
  depth: number;
  onUpdate: (updater: (prev: Message[]) => Message[]) => void;
}) => {
  const baseId = Date.now();

  // USER MESSAGE
  const userMsg: Message = {
    id: baseId,
    role: "user",
    content: [{ type: "text", text }],
  };

  onUpdate((prev) => [...prev, userMsg]);

  const response = await getAIResponse(text);
  await sleep(getAIDelay(text, depth));

  /**
   * =========================
   * TEXT RESPONSE
   * =========================
   */
  if (response.type === "text") {
    const aiMsg: Message = {
      id: baseId + 1,
      role: "ai",
      content: [{ type: "text", text: response.text }],
      // ✅ SAFE ADDITION
      suggestions: response.suggestions,
    } as Message;

    onUpdate((prev) => [...prev, aiMsg]);
    return;
  }

  /**
   * =========================
   * STREAM RESPONSE
   * =========================
   */
  if (response.type === "stream") {
    const streamId = baseId + 2;

    let msg: Message = {
      id: streamId,
      role: "ai",
      content: [
        { type: "thinking", text: response.steps[0] },
      ],
      // ✅ SAFE ADDITION
      suggestions: response.suggestions,
    } as Message;

    onUpdate((prev) => [...prev, msg]);

    // update steps
    for (let i = 1; i < response.steps.length; i++) {
      await sleep(800);

      msg = {
        ...msg,
        content: [
          { type: "thinking", text: response.steps[i] },
        ],
      };

      onUpdate((prev) =>
        prev.map((m) => (m.id === streamId ? msg : m))
      );
    }

    await sleep(600);

    msg = {
      ...msg,
      content: response.final,
      // ✅ preserve suggestions even after final render
      suggestions: response.suggestions,
    } as Message;

    onUpdate((prev) =>
      prev.map((m) => (m.id === streamId ? msg : m))
    );
  }
};