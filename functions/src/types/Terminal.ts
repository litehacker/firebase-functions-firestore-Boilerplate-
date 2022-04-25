export type Terminal = {
  ID: string;
  Active: boolean;
  Adress: string;
  Budget: number;
  Cost: {
    fee: number;
    monthly: number;
  };
  Free: boolean;
  Name: string;
  Owner: string;
  Paid: boolean;
  Payments: string[];
};
