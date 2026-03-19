// controllers/reports.controller.ts
import { Request, Response } from "express";
import { getAlertsData } from "../services/reports/alertsReport.service.js";
import { getFleetSummaryData } from "../services/reports/fleetSummaryReport.service.js";
import {
    exportCSV,
    // exportPDF
} from "../utils/export.utils.js";
import { getSitePerformanceData } from "../services/reports/sitePerformanceReport.service.js";
import puppeteer from "puppeteer";


// Map of report types
const reportMap: Record<
    string,
    { fetchData: (query: any) => Promise<any> }
> = {
    "fleet-summary": { fetchData: getFleetSummaryData },
    "alerts": { fetchData: getAlertsData },
    "site-performance": { fetchData: getSitePerformanceData },
};

// Get report JSON
export const getReport = async (req: Request, res: Response) => {
    const reportType = req.params.reportType as string;
    const report = reportMap[reportType];

    if (!report) return res.status(400).json({ error: "Invalid report type" });

    try {
        const data = await report.fetchData(req.query);
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: "Failed to fetch report", details: err.message });
    }
};

// Export report as CSV or PDF
export const exportReport = async (req: Request, res: Response) => {
    const reportType = req.params.reportType as string;
    const { format } = req.query;

    const report = reportMap[reportType];
    if (!report) {
        return res.status(400).json({ error: "Invalid report type" });
    }

    try {
        const data = await report.fetchData(req.query);

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({
                error: "No data available for the selected dates"
            });
        }

        // ✅ Only CSV supported now
        if (format === "csv") {
            return exportCSV(res, data);
        }

        return res.status(400).json({ error: "Invalid format. Only CSV supported." });

    } catch (err: any) {
        return res.status(500).json({
            error: "Export failed",
            details: err.message
        });
    }
};