import multer, {StorageEngine} from "multer";
import {Request} from "express";

export const storageOptions: StorageEngine = multer.diskStorage({
    filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        if (file.mimetype.startsWith("image")) {
            let extension = file.mimetype.endsWith("jpeg") ? "jpeg" : "png";
            let fileName = "image_" + Date.now() + "." + extension;
            return callback(null, fileName);
        }

        callback(new Error("Wrong file format"), "");
    },
    destination: "./uploads"
});