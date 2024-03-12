import express from "express"
import { currentUser } from "../middlewares/current-user"

const currentUserRouter = express.Router()

currentUserRouter.get("/api/users/currentuser",
currentUser,
 (req, res) => {
    res.send({ currentUser: req.currentUser || null})
})

export {currentUserRouter}