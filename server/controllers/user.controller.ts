import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};


// Implement other authentication-related functions like signIn, forgotPassword, resetPassword, etc.

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ success: true, message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'error'});
    }
};
