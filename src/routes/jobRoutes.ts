import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController';
import authToken from '../middlewares/authTokenHandler';

const router = express.Router();

router.route('/').post(authToken, createJob).get(getJobs);
router.route("/:id").get( getJobById).put( authToken, updateJob).delete(authToken, deleteJob);

export default router;