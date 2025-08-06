import Admin from "../models/Admin";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

// @desc Create admin
// @route POST /api/admin
// @access private
export const createAdmin = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are required !')
    }
    
    const adminExists  = await Admin.findOne({email});
    if(adminExists) {
        res.status(400)
        throw new Error('Admin already registered!')
    }
    
    const admin = await Admin.create({email, password});

    res.status(201).json({message: "Admin created", admin})
    
});

// @desc Get admin
// @route GET /api/admin
// @access private
export const getAdmins = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    
    const admins = await Admin.find();
    res.status(200).json(admins);
    
});

// @desc Update admin
// @route PUT /api/admin
// @access private
export const updateAdmin = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!admin) {
        res.status(404)
        throw new Error("Admin not found")  
    } 
    res.status(200).json({message: "Admin updated"})
    
});

// @desc Delete admin
// @route DELETE /api/admin
// @access private
export const deleteAdmin = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if(!admin) {
        res.status(404)
        throw new Error("Admin not found")  
    } ;
    res.status(200).json({message: "Admin deleted"})
   
});

