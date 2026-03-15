import { Router } from "express";
import { getReport, exportReport } from "../controllers/reports.controller.js";

const router = Router();

// Report endpoints
router.get("/:reportType", getReport);
router.get("/:reportType/export", exportReport);

export default router;