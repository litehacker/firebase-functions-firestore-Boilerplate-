import { MockPayments } from "../mockData/MockPayments";
import { Payment } from "../types/Payment";

const AddPaymensTransaction = (
  cardID: string,
  terminalID: string,
  fee: number
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const newPayment: Payment = {
      ID: "Mock-" + new Date().toString(),
      Amount: fee,
      CardID: cardID,
      TerminalID: terminalID,
      Time: new Date(),
      Type: "once",
    };
    MockPayments.push(newPayment);
    resolve(true);
  });
};
export default AddPaymensTransaction;
