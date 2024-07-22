import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface CustomType extends Request {
  userId?: any
}

export const verifyToken = (req: CustomType, res: Response, next: NextFunction) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("The JWT_SECRET_KEY is not in the environment variable")
  }
  const token = req?.cookies?.token
  if (!token) return res.status(401).json({ message: "Unauthorized" })
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error: any, user: any) => {
    if (error) {
      return res.status(403).send("Token is not valid")
    }
    req.userId = user.userId
    next()
  })
}