import { config } from "dotenv";
import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import logic from "../logic";
import jwt from "jsonwebtoken";
import { httpStatusErrorCode } from "./helpers";

config();

const router: Router = Router();

const jsonBodyParser = bodyParser.json();

router.post("/auth", jsonBodyParser, (req: Request, res: Response) => {
  const { body: { email } } = req;

  logic.authenticate(email)
    .then(() => {
      const { JWT_SECRET, JWT_EXP } = process.env;

      const token = jwt.sign({ sub: email }, JWT_SECRET, { expiresIn: JWT_EXP });

      res.json({ message: "user authenticated", token });
    })
    .catch((err: Error) => {
      const { message } = err;
      const errorCode = httpStatusErrorCode(err);

      res.status(errorCode).json({ message });
    });
});

export default router;
