import express from "express";
import { applyJob } from "../controllers/applyJobController";
import { upload } from "../middlewares/fileHandler";


const router = express.Router();

router.post('/:jobId', upload.single('file'), applyJob);

export default router;