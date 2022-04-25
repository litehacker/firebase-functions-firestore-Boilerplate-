import * as functions from "firebase-functions";
import {
  addPaymensTransaction,
  decreaseBalance,
  freeRide,
  getCard,
  getTerminal,
  increaseBudget,
} from "./functions";
import { Card } from "./types/Card";
import { Terminal } from "./types/Terminal";

// import { inspect } from "util"; // or directly

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
/* 
  
*/
/**
 * Handle HTTP requests.
 * https://cloud.google.com/firestore/pricing?authuser=0
 * calculate the price of the function:
 * 4 writes (1 write costs USD 0.0000018)= 0.0000072 USD
 * 2 reads (1 read costs USD 0.0000006)  = 0.0000012 USD
 * @param JSON.body runs on  https://us-central1-lift-os.cloudfunctions.net/payForRide
 * takes Content-Type as text/plain.
 * sample body:
 * {"cardID":"Et1FTrYmfuqXdJY2zeIf","terminalId":"asd"}
 */
export const payForRide = functions.https.onRequest(
  (request: functions.Request, response) => {
    const data = JSON.parse(request.body);
    console.log(data);
    try {
      functions.logger.info(data, { structuredData: true });

      const terminalID: Terminal["ID"] = data.terminalID;
      const cardID: Card["ID"] = data.cardID;

      getCard(cardID)
        .then((card) => {
          getTerminal(terminalID)
            .then((terminal: Terminal) => {
              if (terminal.Active) {
                if (terminal.Free || terminal.Paid) {
                  freeRide(cardID, terminal.ID)
                    .then(() => {
                      response.status(201);
                      response.end();
                    })
                    .catch((e) => {
                      response.status(e);
                      functions.logger.info(
                        e + "couldn't freeRide()" + cardID + ", " + terminal,
                        { structuredData: true }
                      );
                    });
                } else if (card.Balance - terminal.Cost.fee >= 0) {
                  decreaseBalance(cardID, terminal.Cost.fee)
                    .then(() => {
                      response.status(201);
                      response.end();
                    })
                    .catch((e) => {
                      functions.logger.info(
                        e +
                          "couldn't decreaseBalance" +
                          cardID +
                          ", " +
                          terminal.Cost.fee,
                        { structuredData: true }
                      );
                    });
                  increaseBudget(terminalID, terminal.Cost.fee)
                    .then(() => {
                      functions.logger.info(
                        "SUCCESS increaseBudget" +
                          terminalID +
                          ", " +
                          terminal.Cost.fee,
                        { structuredData: true }
                      );
                    })
                    .catch((e) => {
                      response.status(e);
                      functions.logger.info(
                        e +
                          "couldn't increaseBudget" +
                          terminalID +
                          ", " +
                          terminal.Cost.fee,
                        { structuredData: true }
                      );
                    });
                  addPaymensTransaction(cardID, terminalID, terminal.Cost.fee)
                    .then(() => {
                      functions.logger.info(
                        "SUCCESS addPaymensTransaction" +
                          terminalID +
                          ", " +
                          cardID,
                        { structuredData: true }
                      );
                    })
                    .catch((e) => {
                      response.status(e);
                      functions.logger.info(
                        e +
                          "couldn't addPaymensTransaction" +
                          terminalID +
                          ", " +
                          cardID,
                        { structuredData: true }
                      );
                    });
                } else {
                  response.status(291);
                  // not enough balance on card
                }
              } else {
                response.status(295);
                //terminal disabled
              }
            })
            .catch((e) => {
              response.status(e);
              // terminal does not exist
            });
        })
        .catch((e) => {
          response.status(e);
          // card doesn't exist
        })
        .finally(() => {
          response.end();
        });
      // // add record to "Payments"
      // if (cardID === "Et1FTrYmfuqXdJY2zeIf") {
      //   // make mayment

      //   response.status(201);
      //   response.end();
      // } else {
      //   // reject payment
      //   response.status(299);
      //   response.end();
      // }
    } catch (error) {
      console.log("Backend error:", error, data);
      response.status(500);
      functions.logger.info(
        `Error payForRide() ${error} request:${request} ->>>> body: ${data}`,
        { structuredData: true }
      );
    }
  }
);

// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Firestore under the path /messages/:documentId/original
// export const addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });
