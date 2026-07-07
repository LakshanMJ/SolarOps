import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});


router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded",
            });
        }

        const uploadResult = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder: "solarops",
                transformation: [
                    {
                        width: 1200,
                        height: 800,
                        crop: "limit",
                        quality: "auto",
                        fetch_format: "auto",
                    },
                ],
            }
        );

        res.json({
            url: uploadResult.secure_url,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Image upload failed",
        });
    }
});


export default router;