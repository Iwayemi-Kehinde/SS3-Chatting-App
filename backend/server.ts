import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import AuthRoute from "./routes/AuthRoutes"
import { Request, Response, NextFunction } from "express";
import ContactRoutes from "./routes/ContactRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

if (!process.env.ORIGIN) {
  throw new Error('ORIGIN environment variable is not set');
}
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set');
}

//middlewares
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.originalUrl);
  next();
});
app.use(cors({
  origin: [process.env.ORIGIN],
  credentials: true
}))
app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", AuthRoute)
app.use("api/contact", ContactRoutes)

//db connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error: any) => console.log(error.message));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello chat app" });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
