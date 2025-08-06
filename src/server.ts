import express, {type Request, type Response} from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";
import jobRoutes from "./routes/jobRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api/jobs', jobRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("server is running fine")
})

export default app;