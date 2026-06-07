import { getAIResponse } from "../../../services/ai/getAIResponse";
import { useChatStore } from "../../../store/chat.store";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const processUserMessage = async (text: string, depth: number) => {
  const { addMessage, updateMessage, setStarted } =
    useChatStore.getState();

  setStarted();

  const baseId = Date.now();

  // 1. Add user message
  addMessage({
    id: baseId,
    role: "user",
    content: [{ type: "text", text }],
  });

  const response = await getAIResponse(text);

  await sleep(400 + text.length * 10);

  const id = baseId + 1;

  // 2. Build initial AI message safely
  addMessage({
    id,
    role: "ai",

    // PRIORITY: steps → text → final → fallback
    content: response.steps?.length
      ? [{ type: "thinking", text: response.steps[0] }]
      : response.text
      ? [{ type: "text", text: response.text }]
      : response.final ?? [],

    suggestions: response.suggestions,

    ui_action: response.action
      ? {
          type: response.action,
          payload: response.payload as {
            jobId: string;
            role: string;
          },
        }
      : undefined,
  });

  // 3. Handle streaming steps (if present)
  if (response.steps?.length) {
    for (let i = 1; i < response.steps.length; i++) {
      await sleep(800);

      updateMessage(id, (m) => ({
        ...m,
        content: [{ type: "thinking", text: response.steps![i] }],
      }));
    }

    await sleep(600);
  }

  // 4. Final render (safe fallback handling)
  updateMessage(id, (m) => ({
    ...m,
    content:
      response.final ??
      (response.text
        ? [{ type: "text", text: response.text }]
        : []),
    suggestions: response.suggestions,
  }));
};