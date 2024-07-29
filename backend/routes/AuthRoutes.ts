import { Router } from "express";
import { signup, signin, getUserInfo, updateProfile, addProfileImage,deleteProfileImage } from "../controllers/AuthController"
import { verifyToken } from "../middlewares/AuthMiddleware"
import multer from "multer"

const upload = multer(
  {
    dest:"uploads/profiles/"
  }
)


const authRoute = Router()
authRoute.post("/signup", signup)
authRoute.post("/signin", signin)
authRoute.post("/update-profile", verifyToken, updateProfile)
authRoute.get("/userInfo", verifyToken, getUserInfo)
authRoute.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage)
authRoute.delete("/remove-profile-image", verifyToken, deleteProfileImage)
export default authRoute
