import { getAIResponse } from "../../../services/ai/getAIResponse";
import { useChatStore } from "../../../store/chat.store";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const processUserMessage = async (text: string, depth: number) => {
  const { addMessage, updateMessage, setStarted } =
    useChatStore.getState();

  setStarted();

  const baseId = Date.now();

  addMessage({
    id: baseId,
    role: "user",
    content: [{ type: "text", text }],
  });

  const response = await getAIResponse(text);
  console.log("From chat enegine ",response)
  await sleep(400 + text.length * 10);

  if (response.type === "text") {
    addMessage({
      id: baseId + 1,
      role: "ai",
      content: [{ type: "text", text: response.text }],
      suggestions: response.suggestions,
    });
    return;
  }



// this dosen't works at all because job panel is not being displayed because of this
if (response.type === "ui_action") {
  addMessage({
    id: baseId + 2,
    role: "ai",
    content: [],
    ui_action: {
      type: response.action,
      payload: response.payload,
    },
  });

  return;
}

  if (response.type === "stream") {
    const id = baseId + 2;

    addMessage({
      id,
      role: "ai",
      content: [{ type: "thinking", text: response.steps[0] }],
      suggestions: response.suggestions,
    });

    for (let i = 1; i < response.steps.length; i++) {
      await sleep(800);

      updateMessage(id, (m) => ({
        ...m,
        content: [{ type: "thinking", text: response.steps[i] }],
      }));
    }

    await sleep(600);

    updateMessage(id, (m) => ({
      ...m,
      content: response.final,
      suggestions: response.suggestions,
    }));
  }
};