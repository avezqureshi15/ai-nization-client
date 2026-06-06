import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { context } from "../util";

export const publishResponse = {
  default: () =>
    ( {
      type: "ui_action",
      action: "SHOW_JOB_PANEL",
      payload: {
        jobId: context.jobId,
        role: context.role
      }
    } satisfies AIResponse),
 
};