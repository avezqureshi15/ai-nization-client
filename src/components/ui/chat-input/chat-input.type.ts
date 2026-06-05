
export type ChatInputProps = {
  mounted?: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  Icon?: any;
  Waveform?: any;
  onSend: () => void;
};

export type InputActionsProps = {
  Icon: any;
  Waveform: any;
  onSend: () => void;
};