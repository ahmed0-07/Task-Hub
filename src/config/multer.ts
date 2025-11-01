import multer from "multer";
import path from 'path'
import { type Request } from "express";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, 'uploads')
    },

    filename: (req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now();
        const userId = req.user?.username;
        const ext = path.extname(file.originalname);
        cb(null, `user-${userId}-${uniqueSuffix}`);
    }
})

export const uploadPDF = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});