import express from "express";
import { adminLogin } from "../controllers/authController";
import { upload } from "../middlewares/fileHandler";

const router = express.Router();

router.post("/login", upload.none(), adminLogin);

export default router;
