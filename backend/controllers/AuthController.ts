import { Request, Response, NextFunction } from "express";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxAge = 3 * 24 * 60 * 1000;
const createToken = (email: string, userId: any) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not set");
  }
  return jwt.sign({ email, userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};
interface CustomType extends Request {
  userId?: any;
}
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      email: email,
      password: password,
    });

    const token = createToken(email, user._id);

    res.cookie("token", token, {
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error: any) {}
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json("Email or password Incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json("Email or password Incorrect");
    }

    res.cookie("token", createToken(email, user._id), {
      maxAge,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    // const {password: pass,  ...rest} = user.toObject()
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {}
};

export const getUserInfo = async (req: CustomType, res: Response) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with the given id not found");
    }

    return res.status(201).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {}
};
