
export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "thinking"; text: string }
  | { type: "code"; code: string }
  | { type: "image"; url: string }
  | { type: "markdown"; content: string };


export type UserMessage = {
  id: number;
  role: "user";
  content: ContentBlock[];
};


export type Suggestion = {
  label: string;
  action: string;
};


// =============================

export type UIAction =
  | {
      type: "SHOW_JOB_PANEL";
      payload: {
        jobId: string;
        role: string;
        
      };
    };


// =============================
// 5. AI MESSAGE (ONLY RENDER DATA)
// =============================
export type AIMessage = {
  id: number;
  role: "ai";
  content: ContentBlock[];
  suggestions?: Suggestion[];

  // optional side-effect attached to message
  ui_action?: UIAction;
};



export type Message = UserMessage | AIMessage;

type UIEvent = {
  atStep?: number; 
  action: string;
  payload: any;
};


export type AIResponse =
  | {
      type: "text";
      text: string;
      suggestions?: Suggestion[];
    }
  | {
      type: "stream";
      steps: string[];
      final: ContentBlock[];
      suggestions?: Suggestion[];
    }
  | {
      type: "ui_action";
      action: "SHOW_JOB_PANEL";
      payload: {
        jobId: string;
        role: string;
      };
      suggestions?: Suggestion[];
    }
    //  | {
    //   type: "stream";
    //   steps: string[];
    //   events?: UIEvent[];   
    //   final: ContentBlock[];
    // };