export const intents = {
  hire: (text: string) => text.includes("hire"),

  role: () => true, // always next input in your current flow

  seniority: (text: string) =>
    text.includes("senior") || text.includes("system"),

  leadership: (text: string) =>
    text.includes("mentor") || text.includes("microfrontend"),

  format: (text: string) =>
    text.includes("lengthy") || text.includes("formatted"),

  publish: (text: string) =>
    text.includes("upload") ||
    text.includes("career") ||
    text.includes("post"),

  publishing: (text: string) =>
    text.includes("publish"), 

  finalize: (text: string) =>
    text.includes("finalize"),
};