import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
import express from "express";
import {newsletter} from "./routes/newsletter";

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.post("/newsletter", newsletter);

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);
