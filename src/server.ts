import express, {type Request, type Response} from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();

const app = express();

connectDB();

app.get("/", (req: Request, res: Response) => {
    res.send("server is running fine")
})

export default app;