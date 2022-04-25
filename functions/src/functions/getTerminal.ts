import { MockTerminals } from "../mockData/MockTerminals";
import { Terminal } from "../types/Terminal";

const GetTerminal = (terminalID: Terminal["ID"]): Promise<any> => {
  return new Promise<Terminal>((resolve, reject) => {
    let result: Terminal | undefined = MockTerminals.find(
      (terminal) => terminal.ID === terminalID
    );
    if (result) {
      resolve(result);
    } else {
      console.log("GetTerminal error. terminal: ", terminalID);
      reject(292);
    }
  });
};
export default GetTerminal;
