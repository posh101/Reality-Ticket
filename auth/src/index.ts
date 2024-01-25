import  express from "express"

//Import Route Handlers
import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"

const app = express()
app.use(express.json())

//Route Handlers
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.listen(1000, () => {
    console.log("listening on port:1000")
})