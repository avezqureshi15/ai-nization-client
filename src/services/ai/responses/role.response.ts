import type { AIResponse } from "../../../app/chat/pages/chat.type";

export const roleResponse = {
  default: () =>
    ( {
      type: "text",
      text: "Understood. Should I make this a senior role with system design responsibilities?"
    } satisfies AIResponse),
 
};