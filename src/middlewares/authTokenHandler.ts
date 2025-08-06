import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { console } from "inspector";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request to include optional main property
declare module "express-serve-static-core" {
    interface Request {
        admin?: JwtPayload | string;
    }
}

const authToken = asyncHandler ( async (req: Request, res: Response, next: NextFunction) => {
    let token;
    console.log("authHeader :", req)

    let authHeader = req.headers.Authorization || req.headers.authorization;


    if(typeof authHeader === "string" && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(" ")[1];
        console.log("token :", token)
        jwt.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
            if(err || !decoded || typeof decoded === "string") {
                res.status(401);
                throw new Error('Not authorized');
            }

            const { id, email } = decoded as {id: string; email: string};
            req.admin = {id, email};
            next();
        });
    } else{
        res.status(401);
        throw new Error('Not authorized: Token missing')
    }
});

export default authToken;