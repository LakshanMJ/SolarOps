import express from "express";
import { fetchMetadata } from "../controllers/metadata.controller.js";

const router = express.Router();

router.get("/metadata", fetchMetadata);

export default router;