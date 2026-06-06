export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "thinking"; text: string }
  | { type: "code"; code: string }
  | { type: "image"; url: string }
  | { type: "markdown"; content: string };

export type UserMessage = {
  id: number;
  role: "user";
  content: ContentBlock[]; // 👈 FIX
};

export type Suggestion = {
  label: string;
  action: string;
};


export type AIMessage = {
  id: number;
  role: "ai";
  content: ContentBlock[];
    suggestions?: Suggestion[];

};

export type Message = UserMessage | AIMessage;

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
    };