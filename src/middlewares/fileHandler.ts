import multer from "multer";

const storage = multer.memoryStorage(); // Store in RAM

export const upload = multer({ storage, limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit
}
});