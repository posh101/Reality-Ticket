import {Request, Response, NextFunction} from "express"
import { CustomError } from "../errors/custom-errors";

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response,
     next: NextFunction
     ) => {
      if(err instanceof CustomError) {
        res.status(err.statusCode).send({errors: err.serializeErrors()});
      }

      res.status(400).json({
        errors: [{message: "Something went wrong"}]
      });
};