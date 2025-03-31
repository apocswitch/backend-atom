import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import routes from "./routes";
import {setupSwagger} from "./config/swagger";
import {errorHandler} from "./utils/error-handler";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use(routes);
app.use(errorHandler);
export const api = functions.https.onRequest(app);
