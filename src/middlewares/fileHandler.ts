import multer from "multer";

import { Request } from "express";

const storage = multer.memoryStorage(); // Store in RAM

const fileFilter = (req:Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    
    const allowedType= ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if(allowedType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
}

export const upload = multer({ storage, limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
},
fileFilter,
});