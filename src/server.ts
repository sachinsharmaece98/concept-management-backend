import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import jobRoutes from "./routes/jobRoutes";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";
import applyJobRoute from "./routes/applyJobRoutes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(errorHandler);

app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes, authRoutes);
app.use("/api/contactUs", contactRoutes);
app.use("/api/applyJob", applyJobRoute);

// to check server status
app.get("/", (req: Request, res: Response) => {
  const now = new Date();
  res.send(`server is running fine: ${now.toISOString()}`);
});

export default app;
