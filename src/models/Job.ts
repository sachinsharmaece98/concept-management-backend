import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    company: String,
    role: String,
    jobType:String,
    loaction: String,
    expireAt: { type: Date },
  },
  { timestamps: true },
);

jobSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Job = mongoose.model("job", jobSchema);

export default Job;
