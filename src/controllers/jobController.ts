import Job from "../models/job"
import { Request, Response, NextFunction } from "express"

// @desc Create job
// @route POST /api/jobs
// @access private
export const createJob = async(req: Request, res:Response, next: NextFunction) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (err) {
        next(err);
    }
}

// @desc Get jobs
// @route GET /api/jobs
// @access public
export const getJobs = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        next(err);
    }
};

// @desc Get job by id
// @route GET /api/jobs/:id
// @access public
export const getJobById = async(req: Request, res:Response, next: NextFunction) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job) return res.status(404).json({message: "Job not found"});
        res.json(job);
    } catch (err) {
        next(err);
    }
};

// @desc Update job
// @route PUT /api/jobs/:id
// @access private
export const updateJob = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!job) return res.status(404).json({message: "Job not found"});
        res.json(job);
    } catch (err) {
        next(err);
    }
};

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access private
export const deleteJob = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if(!job) return res.status(404).json({message: "Job not found"});
    } catch (err) {
        next(err);
    }
};

