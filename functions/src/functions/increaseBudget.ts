import { MockTerminals } from "../mockData/MockTerminals";
import { Terminal } from "../types/Terminal";

const IncreaseBudget = (
  terminalID: Terminal["ID"],
  fee: number
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const result = MockTerminals.find((terminal) => terminal.ID === terminalID);

    if (result) {
      result.Budget += fee;
      resolve(true);
    } else {
      reject(292);
    }
  });
};
export default IncreaseBudget;
