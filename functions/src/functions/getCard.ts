import { MockCards } from "../mockData/MockCards";
import { Card } from "../types/Card";

const GetCard = (cardID: string): Promise<Card> => {
  return new Promise<Card>((resolve, reject) => {
    // Mock data of Cards
    let result: Card | undefined = MockCards.find((card) => card.ID === cardID);

    if (result) {
      resolve(result);
    } else {
      reject(293);
    }
  });
};
export default GetCard;
