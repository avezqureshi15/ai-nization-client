type HistoryItem = {
  label: string;
  active?: boolean;
};

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  HISTORY_TODAY: HistoryItem[];
  HISTORY_EARLIER: HistoryItem[];
  Icon: any;
};
