import type { FlowState } from "../../core/state-machine";
import { intents } from "./handlers";

export const transitions: Record<
  FlowState,
  (input: string) => FlowState | null
> = {
  INIT: (text) => (intents.hire(text) ? "ROLE_INTRO" : null),

  ROLE_INTRO: () => "ROLE_DEFINED",

  ROLE_DEFINED: (text) =>
    intents.seniority(text) ? "SENIORITY_ADDED" : null,

  SENIORITY_ADDED: (text) =>
    intents.leadership(text) ? "LEADERSHIP_ADDED" : null,

  LEADERSHIP_ADDED: (text) =>
    intents.format(text) ? "FORMATTED" : null,

  FORMATTED: (text) => {
    if (intents.publish(text)) return "READY_TO_PUBLISH";
    if (intents.finalize(text)) return "FINALIZED";
    return null;
  },

  READY_TO_PUBLISH: () => "PUBLISHING",
  PUBLISHING: (text) => intents.publishing(text) ? "FINALIZED" : null,
  FINALIZED: () => null,
};