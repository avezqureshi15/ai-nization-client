import type { AIResponse } from "../../app/chat/pages/chat.type";

import type { FlowState } from "./core/state-machine";
import { runFlow } from "./flows/job-flow";
import { finalResponse } from "./responses/final.response";
import { formattingResponse } from "./responses/formatting.response";
import { initResponses } from "./responses/init.response";
import { leaderShipResponse } from "./responses/leadership.response";
import { publisingResponses } from "./responses/publishing.response";
import { publishTriggerResponse } from "./responses/publishTrigger.response";
import { roleResponse } from "./responses/role.response";
import { seniorityResponse } from "./responses/seniority.response";
import { cleanMarkdown } from "./util";


let state: FlowState = "INIT";

let context = {
  role: "",
  jobId: "job_" + Date.now(),
};

const getResponseByState = (state: FlowState): AIResponse => {
  switch (state) {
    case "INIT":
      return initResponses.default();

    case "ROLE_INTRO":
      return initResponses.askRole();

    case "ROLE_DEFINED":
      return roleResponse.default();

    case "SENIORITY_ADDED":
      return seniorityResponse.default();

    case "LEADERSHIP_ADDED":
      return leaderShipResponse.default();

    case "FORMATTED":
      return formattingResponse.default();

    case "READY_TO_PUBLISH":
      return publishTriggerResponse.default();

    case "PUBLISHING":
      return publisingResponses.default();
      
    case "FINALIZED":
      return finalResponse.default();
    

  }
};

export const getAIResponse = async (
  input: string
): Promise<AIResponse> => {
  const text = cleanMarkdown(input.toLowerCase());

  const nextState = runFlow(state, text);
  state = nextState;

  // update context safely
  if (state === "ROLE_DEFINED") {
    context.role = input;
  }

  return getResponseByState(state);
};