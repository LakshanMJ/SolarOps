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
    "alerts": { fetchData: getAlertsData },
    "fleet-summary": { fetchData: getFleetSummaryData },
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
    const { format, fromDate, toDate } = req.query;

    const report = reportMap[reportType];
    if (!report) return res.status(400).json({ error: "Invalid report type" });

    try {
        const data = await report.fetchData(req.query);

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return res.status(404).json({ error: "No data available for the selected dates" });
        }

        // ✅ CSV stays the same
        if (format === "csv") return exportCSV(res, data);

        // ✅ NEW PDF FLOW
        if (format === "pdf") {
            if (!fromDate || !toDate) {
                return res.status(400).json({ error: "Missing date filters" });
            }

            const browser = await puppeteer.launch({
                headless: true,
            });

            const page = await browser.newPage();

            // 👇 dynamically map report → frontend route
            let frontendPath = "";

            if (reportType === "fleet-summary") {
                frontendPath = "/fleet-report";
            } else if (reportType === "alerts") {
                frontendPath = "/alerts-report";
            } else if (reportType === "site-performance") {
                frontendPath = "/site-performance-report";
            }

            const url = `http://localhost:5173${frontendPath}?fromDate=${fromDate}&toDate=${toDate}`;

            await page.goto(url, { waitUntil: "networkidle0" });

            // wait for charts/icons
            await new Promise(resolve => setTimeout(resolve, 1000));

            const pdf = await page.pdf({
                format: "A4",
                printBackground: true,
            });

            await browser.close();

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `inline; filename=${reportType}-report.pdf`
            );

            return res.send(pdf);
        }

        return res.status(400).json({ error: "Invalid format" });

    } catch (err: any) {
        res.status(500).json({ error: "Export failed", details: err.message });
    }
};