import { Terminal } from "../types/Terminal";

export const MockTerminals: Terminal[] = [
  {
    ID: "123",
    Active: true,
    Adress: "asdasd",
    Budget: 0,
    Cost: {
      fee: 0.1,
      monthly: 10,
    },
    Free: false,
    Name: "LALA land",
    Owner: "me",
    Paid: false,
    Payments: [],
  },
  {
    ID: "124",
    Active: true,
    Adress: "asdasd",
    Budget: 0,
    Cost: {
      fee: 1,
      monthly: 10,
    },
    Free: false,
    Name: "LALA land",
    Owner: "me",
    Paid: false,
    Payments: [],
  },
  {
    ID: "125",
    Active: true,
    Adress: "asdasd",
    Budget: 0,
    Cost: {
      fee: 1,
      monthly: 10,
    },
    Free: true,
    Name: "LALA land",
    Owner: "me",
    Paid: false,
    Payments: [],
  },
];
