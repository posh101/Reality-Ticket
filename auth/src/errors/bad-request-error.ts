import { CustomError } from "./custom-errors"

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor() {
        super();

        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

        serializeErrors() {
            return [{ message: 'Invalid Credentials'}]
        }
    }
