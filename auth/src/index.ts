import  express from "express";
import 'express-async-errors';
import  mongoose from "mongoose"
import { ConnectOptions } from "mongoose";
import dotenv from "dotenv";


//Import Route Handlers
import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"

//Import error handler
import { errorHandler } from "./middlewares/error-handlers"
import { NotFoundError } from "./errors/not-found-error"
import { DatabaseConnectionError } from "./errors/database-connection-error";

const app = express();
app.use(express.json());

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

//Connect to enviroment variable
dotenv.config();
const PORT = process.env.PORT || 8000;

//Connectig to mongodb
const url = process.env.MONGO_URL
mongoose.connect(url,)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err.message))

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    });
