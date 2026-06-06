export type Context = {
  role: string;
  jobId: string;
};

export const createContext = (): Context => ({
  role: "",
  jobId: "job_" + Date.now(),
});