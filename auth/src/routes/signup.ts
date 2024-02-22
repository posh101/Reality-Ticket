import express, {Request, Response} from "express"
import {body} from "express-validator"
import {User} from "../models/user"
import { RequestValidation } from "../middlewares/RequestValidation"
import { BadRequestError } from "../errors/bad-request-error"
import Jwt  from "jsonwebtoken"
import "dotenv/config";

const signupRouter = express.Router()

signupRouter.post("/api/users/signup",
[
body('email')
  .isEmail()
  .withMessage('Email must be valid'),
body('password')
  .trim()
  .isLength({min: 4, max: 20})
  .withMessage('Password must be between 4 and 20 characters')
],

RequestValidation,
 async (req: Request, res: Response) => {
  const { email, password } = req.body;

    const existingUser = await User.findOne({ email })
    if(existingUser) {
     throw new BadRequestError();
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = Jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.SIGN_IN_KEY)
     
    req.session.jwt = userJwt;

    res.status(201).json(user);

})

export {signupRouter}