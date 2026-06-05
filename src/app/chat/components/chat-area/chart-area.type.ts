export type ChatAreaProps = {
  hasStartedChat: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
};