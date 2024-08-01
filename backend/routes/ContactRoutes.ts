import {Router} from "express"
import { verifyToken } from "../middlewares/AuthMiddleware"
import { searchContacts } from "../controllers/ContactController"

const ContactRoutes = Router()


ContactRoutes.post("/search", verifyToken, searchContacts)

export default ContactRoutes