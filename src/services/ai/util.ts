export const cleanMarkdown = (md: string) =>
  md
    .replace(/\r\n/g, "\n")
    .replace(/^\s+/gm, "")
    .trim();

export  let context = {
  role: "",
  jobId: "job_" + Date.now(),
};