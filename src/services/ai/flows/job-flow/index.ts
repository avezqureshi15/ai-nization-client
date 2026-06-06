import type { FlowState } from "../../core/state-machine";
import { transitions } from "./transitions";

export const runFlow = (
  state: FlowState,
  input: string
): FlowState => {
  const next = transitions[state]?.(input);
  return next ?? state;
};