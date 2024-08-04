import { Request, Response, NextFunction } from "express"
import { User } from "../models/UserModel"

interface CustomType extends Request {
    userId?: any
}

export const searchContacts = async (req: CustomType, res: Response, next: NextFunction) => {
    try {

        const { searchTerm } = req.body

        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).json("Search term is required")
        }


        const sanitizeInput = (input: string) => {
            return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        const sanitizedSearchTerm = sanitizeInput(searchTerm);

        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                { _id: { $ne: req.userId } },
                {
                    $or: [
                        { firstName: { $regex: regex } },
                        { lastName: { $regex: regex } },
                        { email: { $regex: regex } }
                    ]
                }
            ]
        });

        if (!contacts) {
            return res.status(404).json({ message: "No contacts found" });
        }
        return res.status(200).json({ contacts });
    } catch (error) {
        console.error(error) //Just learnt this method... then introduced it in my code ...
        return res.status(500).json("Internal server error")
    }
}

