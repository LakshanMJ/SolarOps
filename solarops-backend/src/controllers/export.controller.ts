// controllers/exportController.ts
import { Request, Response } from "express";
import { generateCsv } from "../services/export.service.js";


export const exportCsvController = async (req: Request, res: Response) => {
  try {
    const filters = req.body;

    // Call service to generate CSV string
    const csv = await generateCsv(filters);

    // Dynamic filename with timestamp
    const now = new Date();
    const timestamp = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const filename = `alerts_report_${timestamp}.csv`;

    // Send CSV
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate CSV" });
  }
};