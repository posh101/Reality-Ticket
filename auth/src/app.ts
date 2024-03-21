import  express from "express";
import 'express-async-errors';
import cookieSession from "cookie-session";
import morgan from "morgan";


//Import Route Handlers
import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"

//Import error handler
import { errorHandler } from "./middlewares/error-handlers"
import { NotFoundError } from "./errors/not-found-error"


const app = express();
app.set('proxy', true)
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: false,
    domain: process.env.SESSION_DOMAIN
}))

//Route Handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

//Error Handler middleware
app.use(errorHandler);
app.use(morgan('tiny'));

export { app }