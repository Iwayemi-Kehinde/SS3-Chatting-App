import { Router } from "express";
import { signup, signin, getUserInfo } from "../controllers/AuthController"
import {verifyToken} from "../middlewares/AuthMiddleware"

const authRoute = Router()
authRoute.post("/signup", signup)
authRoute.post("/signin", signin)
authRoute.get("/userInfo", verifyToken ,getUserInfo)
export default authRoute
