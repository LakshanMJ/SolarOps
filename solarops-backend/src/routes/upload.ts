import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
// @ts-ignore
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "solarops",
        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ],
        transformation: [
            {
                width: 1200,
                height: 800,
                crop: "limit",
                quality: "auto",
                fetch_format: "auto"
            }
        ]
    }
});


const upload = multer({ storage });


router.post("/", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            error: "No file uploaded"
        });
    }


    res.json({
        url: req.file.path
    });

});


export default router;