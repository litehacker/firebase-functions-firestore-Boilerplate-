import { MockTerminals } from "../mockData/MockTerminals";
import { Terminal } from "../types/Terminal";
import AddPaymensTransaction from "./addPaymensTransaction";

const FreeRide = (cardID: string, terminalID: Terminal["ID"]): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const result = MockTerminals.find((terminal) => terminal.ID === terminalID);
    if (result) {
      AddPaymensTransaction(cardID, terminalID, 0);
      resolve(true);
    } else {
      reject(292);
    }
  });
};
export default FreeRide;
