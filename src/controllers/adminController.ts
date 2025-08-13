import Admin from "../models/Admin";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// @desc Create admin
// @route POST /api/admin
// @access private
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are required !");
  }

  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already registered!");
  }

  const admin = await Admin.create({ username, password });

  // res.status(201).json({message: "Admin created", admin})

  if (admin) {
    res
      .status(201)
      .json({ message: "Admin created ", username: admin.username });
  } else {
    res.status(400);
    throw new Error("Admin data is not valid!");
  }
});

// @desc Get admin
// @route GET /api/admin
// @access private
export const getAdmins = asyncHandler(async (req: Request, res: Response) => {
  const admins = await Admin.find();
  res.status(200).json(admins);
});

// @desc Update admin
// @route PUT /api/admin
// @access private
export const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  res.status(200).json({ message: "Admin updated" });
});

// @desc Delete admin
// @route DELETE /api/admin
// @access private
export const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  res.status(200).json({ message: "Admin deleted" });
});
