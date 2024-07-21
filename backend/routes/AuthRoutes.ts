import { Router } from "express";
import { signup, signin } from "../controllers/AuthController"

const authRoute = Router()
authRoute.post("/signup", signup)
authRoute.post("/signin", signin)
export default authRoute
