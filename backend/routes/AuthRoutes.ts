import { Router } from "express";
import { signup, signin, getUserInfo, updateProfile } from "../controllers/AuthController"
import {verifyToken} from "../middlewares/AuthMiddleware"

const authRoute = Router()
authRoute.post("/signup", signup)
authRoute.post("/signin", signin)
authRoute.post("/update-profile", verifyToken, updateProfile)
authRoute.get("/userInfo", verifyToken, getUserInfo)
export default authRoute
