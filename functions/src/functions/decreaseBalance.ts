import { MockCards } from "../mockData/MockCards";

const DecreaseBalance = (cardID: string, fee: number): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const result = MockCards.find((card) => card.ID === cardID);

    if (result) {
      if (result.Balance - fee < 0) {
        reject(291);
      } else {
        result.Balance -= fee;
        resolve(true);
      }
    } else {
      reject(293);
    }
  });
};
export default DecreaseBalance;
