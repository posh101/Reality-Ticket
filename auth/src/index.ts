import  mongoose from "mongoose";
import { app } from "./app";
import "dotenv/config"

//Connect to enviroment variable
const PORT = process.env.PORT || 8000;

//Connectig to mongodb
const url = process.env.MONGO_URL

async function startServer() {
    await mongoose.connect(url,)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err.message))
    
    app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
    });    
}

startServer();