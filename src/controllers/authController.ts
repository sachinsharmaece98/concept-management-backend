import Admin from "../models/Admin";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const admin = await Admin.findOne({ username });

  if (admin && (await admin.comparePassword(password))) {
    const token = jwt.sign(
      { Admin: { id: admin._id, username: admin.username } },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    res.status(200).json({ token });
  } else {
    res.status(401);
    throw new Error("username or Password in not valid!");
  }
});
