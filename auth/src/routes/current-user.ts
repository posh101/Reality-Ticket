import express from "express"

const currentUserRouter = express.Router()

currentUserRouter.get("/api/users/currentuser", () => {})

export {currentUserRouter}