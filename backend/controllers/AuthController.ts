import { Request, Response, NextFunction, response } from "express";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {renameSync, unlinkSync} from "fs"

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
  file?: any
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

     res.cookie("token", createToken(email, user._id));
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error: any) {
    console.log(error)
  }
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

    res.cookie("token", createToken(email, user._id));

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

  } catch (error) {
    console.log(error)
  }
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
  } catch (error) {
    console.log({ error })
    res.status(500).send("Server error")
  }
};


export const updateProfile = async (req: CustomType, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, color } = req.body
    if (!firstName || !lastName) {
      return res.status(400).send("FirstName, LastName and Color is Required")
    }
    const userData = await User.findByIdAndUpdate(req.userId, {firstName, lastName, color, profileSetup: true}, {new: true, runValidators: true})
    if (!userData) {
      return res.status(404).json("User with the given ID not found")
    }
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    })
  } catch (error) {
    console.log({error})
    res.status(500).send("Internal server error")
  }
}


export const addProfileImage = async (req: CustomType, res:Response, next:NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required")
    }
    const date = Date.now()
    let filename = "uploads/profiles/" + date + req.file.originalname
    renameSync(req.file.path, filename)
    const updatedUser = await User.findByIdAndUpdate(req.userId, { image: filename }, { new: true, runValidators: true })
    return res.status(200).json({
      image: updatedUser?.image
    })
  }catch (error) {
    console.log({ error })
    return res.status(500).send("Internal server error")
  }
}



export const deleteProfileImage = async (req: CustomType, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return response.sendStatus(404)
    }
    if (user.image) {
      unlinkSync(user.image)
    }
    user.image = null
    await user.save()
    return res.status(200).json("Deleted successfully")
  } catch (error) {
    console.log({ error })
    return res.status(500).send("Internal server error")
  }
 }

 export const logout = async (req: CustomType, res: Response) => {
  try {
    res.clearCookie("token")
    return res.status(200).json("Logout successfull")
  } catch(error) {
    console.log(error)
    return res.status(500).json({error})
  }
 }