import express from "express"
import dotenv from "dotenv"
import {Request, Response} from "express"

dotenv.config()

const app = express()

const PORT = process.env.PORT  || 5000

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({message: "Hello chat app"})
})

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})