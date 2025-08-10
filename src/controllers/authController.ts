import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

export const adminLogin = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400)
        throw new Error('All fields are required!')
    }

    const admin = await Admin.findOne({ email });

    if(admin && (await admin.comparePassword(password))) {
        const token = jwt.sign({Admin: {id:admin._id, email: admin.email}}, process.env.JWT_SECRET!, {expiresIn: '1d'});
        res.status(200).json({ token });
    }
    else{ 
        res.status(401)
        throw new Error('Email or Password in not valid!')
    }
});

