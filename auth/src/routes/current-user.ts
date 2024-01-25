import express from "express"

const currentUserRouter = express.Router()

currentUserRouter.get("/api/users/currentuser", (req, res) => {
    res.send("Hi there")
})

export {currentUserRouter}