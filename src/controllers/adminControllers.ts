import Admin from "../models/Admin";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";

// @desc Create job
// @route POST /api/admin
// @access private
export const createAdmin = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    
    const admin = await Admin.create(req.body);
    const {email, password} = admin;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are required !')
    }
    res.status(201).json({message: "Admin created", admin})
    
});

// @desc Create job
// @route GET /api/admin
// @access private
export const getAdmins = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    
    const admins = await Admin.find();
    res.status(200).json(admins);
    
});

// @desc Create job
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

// @desc Create job
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

