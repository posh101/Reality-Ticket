import express from "express"

const signoutRouter = express.Router()

signoutRouter.post("/api/users/signout", (req, res) => {
  res.send("Hello there")
})

export {signoutRouter}