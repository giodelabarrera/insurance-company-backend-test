import { config } from "dotenv";
import { Router, Request, Response } from "express";
import logic from "../logic";
import { httpStatusErrorCode } from "./helpers";
import { jwtValidator } from "./middlewares";

config();

const router: Router = Router();

router.get("/policies/:id/user", jwtValidator, (req: Request | any, res: Response) => {
  const { userEmail, params: { id } } = req;

  logic.retrieveUserByPolicy(userEmail, id)
    .then((targetUser: any) => res.json(targetUser))
    .catch((err: Error) => {
      const { message } = err;
      const errorCode = httpStatusErrorCode(err);

      res.status(errorCode).json({ message });
    });
});

export default router;
