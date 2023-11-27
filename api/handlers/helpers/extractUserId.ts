import jwt from "jsonwebtoken";
import { Request } from "express";

export default (req: Request) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.slice(7);

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const { sub: userId } = payload;

        return userId;
    } else {
        throw new Error("Authorization header is missing");
    }
};
