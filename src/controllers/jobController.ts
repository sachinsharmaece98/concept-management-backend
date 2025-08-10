import Job from "../models/Job"
import asyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"

// @desc Create job
// @route POST /api/jobs
// @access private
export const createJob = asyncHandler ( async(req: Request, res:Response, next: NextFunction) => {
    
        const job = await Job.create(req.body);
        res.status(201).json(job);
    
});

// @desc Get jobs
// @route GET /api/jobs
// @access public
export const getJobs = asyncHandler ( async(req: Request, res: Response, next: NextFunction) => {
    
        const jobs = await Job.find();
        res.status(200).json(jobs);
    
});

// @desc Get job by id
// @route GET /api/jobs/:id
// @access public
export const getJobById = asyncHandler ( async(req: Request, res:Response, next: NextFunction) => {
    
        const job = await Job.findById(req.params.id);
        if(!job) {
            res.status(404)
            throw new Error("Job not found");
        }
        res.status(200).json(job);
    
});

// @desc Update job
// @route PUT /api/jobs/:id
// @access private
export const updateJob = asyncHandler ( async(req: Request, res: Response, next: NextFunction) => {
    
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!job) {
            res.status(404)
            throw new Error("Job not found");
        }
        res.status(200).json({message: "Job updated", job});
    
});

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access private
export const deleteJob = asyncHandler ( async(req: Request, res: Response, next: NextFunction) => {
    
        const job = await Job.findByIdAndDelete(req.params.id);
        if(!job) {
            res.status(404)
            throw new Error("Job not found");
        }

        res.status(200).json({message: "Job deleted"})
    
});

