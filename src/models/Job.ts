import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    type: String,
    salary: String,
    description: String,
    expireDate: { type: Date },
  },
  { timestamps: true },
);

jobSchema.index({ expireDate: 1 }, { expireAfterSeconds: 0 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
