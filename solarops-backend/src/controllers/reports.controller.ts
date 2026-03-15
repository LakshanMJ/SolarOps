// controllers/reports.controller.ts
import { Request, Response } from "express";
import { getAlertsData } from "../services/alertsReport.service.js";
// import { getFleetSummaryData } from "../services/fleetSummaryReport.service";
import { exportCSV, exportPDF } from "../utils/export.utils.js";
import { getSitePerformanceData } from "../services/sitePerformanceReport.service.js";

// Map of report types
const reportMap: Record<
    string,
    { fetchData: (query: any) => Promise<any> }
> = {
    "alerts": { fetchData: getAlertsData },
    // "fleet-summary": { fetchData: getFleetSummaryData },
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
    if (!report) return res.status(400).json({ error: "Invalid report type" });

    try {
        const data = await report.fetchData(req.query);

        // ✅ Check if data is empty
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: "No data available for the selected dates" });
        }

        if (format === "csv") return exportCSV(res, data);
        if (format === "pdf") return exportPDF(res, data);

        return res.status(400).json({ error: "Invalid format" });
    } catch (err: any) {
        res.status(500).json({ error: "Export failed", details: err.message });
    }
};