import  express from "express"

const app = express()
app.use(express.json())

app.listen(1000, () => {
    console.log("listening on port:1000")
})