import express, {Request, Response} from "express";
import { body } from "express-validator";
import { ValidateResult } from "../middlewares/RequestValidation";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const signinRouter = express.Router()

signinRouter.post("/api/users/signin", 
[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('You must supply a password')
],
ValidateResult,
async(req: Request, res: Response) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if(!existingUser) {
    throw new BadRequestError();
  }

  const passwordMatch = await Password.compare(existingUser.password, password)
   
  if(!passwordMatch) {
    throw new BadRequestError();
  }
  
  const userJwt = Jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.SIGN_IN_KEY)

   req.session = {
    jwt: userJwt
   }

   res.status(200).send ({ existingUser })
 })

export {signinRouter}