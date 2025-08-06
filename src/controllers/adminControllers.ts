import Admin from "../models/Admin";
import { Request, Response, NextFunction } from "express";

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json(admin)
    } catch (err) {
        next(err);
    }
};

export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        next(err);
    }
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!admin) return res.status(404).json({message: "Admin not found"})
            res.json({message: "Admin updated"})
    } catch (err) {
        next(err);
    }
};

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if(!admin) return res.status(404).json({message: "Admin not found"});
        res.json({message: "Admin deleted"})
    } catch(err){
        next(err);
    }
};

