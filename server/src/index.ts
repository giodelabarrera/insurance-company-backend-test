import { config } from "dotenv";
import cors from "cors";
import express from "express";
import { securityRouter, userRouter, policyRouter } from "./routes";

config();

const { PORT } = process.env;

const app = express();

app.use(cors());

app.use("/api", securityRouter);
app.use("/api", userRouter);
app.use("/api", policyRouter);

app.listen(PORT, () => console.log(`server up and running on port ${PORT}`));
