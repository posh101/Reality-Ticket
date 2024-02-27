import express from "express"
import  Jwt  from "jsonwebtoken"
import "dotenv/config"

const currentUserRouter = express.Router()

currentUserRouter.get("/api/users/currentuser", (req, res) => {
    if(!req.session?.Jwt) {
     return res.send({ currentUser: null })
    }

    try {
        const payload = Jwt.verify(
            req.session.Jwt,
            process.env.SIGN_IN_KEY
        )

        res.send({ currentUser: payload })
    } catch (err) {
      res.send({ currentUser: null})
    }
})

export {currentUserRouter}