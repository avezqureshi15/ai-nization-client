import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { context } from "../util";

export const publishTriggerResponse = {
  default: () =>
    ( {
        type: "ui_action",
        action: "SHOW_JOB_PANEL",
          suggestions: [
        { label: "Frontend Engineer", action: "role:frontend" },
        { label: "Backend Engineer", action: "role:backend" },
        { label: "Fullstack", action: "role:fullstack" }
      ],
        payload: {
          jobId: context.jobId,
          role: context.role
        }
      } satisfies AIResponse),
 
};