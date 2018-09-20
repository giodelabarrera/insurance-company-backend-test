import { config } from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

config();

const { JWT_SECRET } = process.env;

const jwtValidator = (req: Request|any, res: Response, next: any) => {

    try {
        const authorization: string = req.get("authorization");

        if (!authorization || !authorization.length) { throw new Error("invalid token"); }

        const parts: any[] = authorization.split(" ");

        if (parts.length !== 2) { throw new Error("invalid token"); }

        if (parts[0].toLowerCase() !== "bearer") { throw new Error("invalid token"); }

        const token: string = parts[1];

        const payload: any = jwt.verify(token, JWT_SECRET);

        req.userEmail = payload.sub;

        next();
    } catch ({ message }) {
        res.status(401).json({ message });
    }
};

export default jwtValidator;
