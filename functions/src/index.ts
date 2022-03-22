import * as functions from "firebase-functions";
// import { inspect } from "util"; // or directly

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const payForRide = functions.https.onRequest(
  (request: functions.Request, response) => {
    const data = JSON.parse(request.body);
    console.log(data);
    try {
      // const terminalID = data.terminalID;
      const cardID = data.cardID;
      functions.logger.info(data, { structuredData: true });
      if (cardID === "Et1FTrYmfuqXdJY2zeIf") {
        // make mayment
        response.status(201);
        response.end();
      } else {
        // reject payment
        response.status(299);
        response.end();
      }
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
