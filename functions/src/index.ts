import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import routes from "./routes";
import {setupSwagger} from "./config/swagger";

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use(routes);

export const api = functions.https.onRequest(app);
