import { config } from "dotenv";
import { Router, Request, Response } from "express";
import logic from "../logic";
import { httpStatusErrorCode } from "./helpers";
import { jwtValidator } from "./middlewares";

config();

const router: Router = Router();

router.get("/users/:id", jwtValidator, (req: Request | any, res: Response) => {
  const { userEmail, params: { id } } = req;

  logic.retrieveUser(userEmail, id)
    .then((targetUser: any) => res.json(targetUser))
    .catch((err: Error) => {
      const { message } = err;
      const errorCode = httpStatusErrorCode(err);

      res.status(errorCode).json({ message });
    });
});

router.get("/users/name/:name", jwtValidator, (req: Request | any, res: Response) => {
  const { userEmail, params: { name } } = req;

  logic.retrieveUserByName(userEmail, name)
    .then((targetUser: any) => res.json(targetUser))
    .catch((err: Error) => {
      const { message } = err;
      const errorCode = httpStatusErrorCode(err);

      res.status(errorCode).json({ message });
    });
});

router.get("/users/name/:name/policies", jwtValidator, (req: Request | any, res: Response) => {
  const { userEmail, params: { name } } = req;

  logic.listPoliciesByUserName(userEmail, name)
    .then((policies: any[]) => res.json(policies))
    .catch((err: Error) => {
      const { message } = err;
      const errorCode = httpStatusErrorCode(err);

      res.status(errorCode).json({ message });
    });
});

export default router;
