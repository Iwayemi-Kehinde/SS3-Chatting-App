import { Router } from "express";
import { signup, signin, getUserInfo, updateProfile } from "../controllers/AuthController"
import {verifyToken} from "../middlewares/AuthMiddleware"

const authRoute = Router()
authRoute.post("/signup", signup)
authRoute.post("/signin", signin)
authRoute.get("/userInfo", verifyToken, getUserInfo)
authRoute.post("/update-profile", verifyToken, updateProfile)
export default authRoute
