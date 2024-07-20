import express from "express"
import dotenv from "dotenv"
import {Request, Response, NextFunction} from "express"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

//middlewares
app.use((req: Request, res:Response, next:NextFunction) => {
  console.log(req.method, req.originalUrl)
  next()
})

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({message: "Hello chat app"})
})

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})