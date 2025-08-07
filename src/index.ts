import cors from "cors";
import {newsletter} from "./routes/newsletter";
import express, { Router } from "express";
import serverless from "serverless-http";
import { home } from "./routes/home";

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

const router = Router();
router.get("/", home);
router.post("/newsletter", newsletter);

app.use("/", router);

export const handler = serverless(app);