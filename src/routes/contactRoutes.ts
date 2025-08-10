import express from "express";
import { contactUs  } from "../controllers/contactController";
import { upload } from "../middlewares/fileHandler";

const router = express.Router();

router.post('/', upload.single('file'), contactUs);

export default router;