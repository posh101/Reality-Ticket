import {Request, Response, NextFunction} from "express"
import Jwt from "jsonwebtoken";
import "dotenv/config"

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
req:Request, 
res: Response,
next: NextFunction
) => {

    if(!req.session?.jwt) {
        return next();
    }

    try {
        const payload = Jwt.verify(req.session.Jwt,
            process.env.SIGN_IN_KEY) as UserPayload
    } catch (err) {}

    next();
}