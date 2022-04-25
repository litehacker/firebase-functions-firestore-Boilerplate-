export type Payment = {
  ID: string;
  Amount: number;
  CardID: string;
  TerminalID: string;
  Time: Date;
  Type: "once" | "monthly" | "owner" | "balance";
};
