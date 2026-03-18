import React, { useRef, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Divider,
    MenuItem,
    Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import SolarDatePicker from "@/utils/SolarDatePicker";
import LayersIcon from '@mui/icons-material/Layers';
import { exportReportFile } from "@/utils/exportFile";
import { FleetSummaryReportPdfLayout } from "./FleetSummaryReportPdfLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function FleetSummaryReport(metaData: any) {
    const [filters, setFilters] = useState({
        reportType: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    const reportRef = useRef<HTMLDivElement>(null);

    const handleExportPdf = async () => {
        const { fromDate, toDate } = filters;

        if (!fromDate || !toDate) {
            alert("Please select both From and To dates before exporting.");
            return;
        }

        if (!reportRef.current) return;

        const canvas = await html2canvas(reportRef.current, { scale: 4 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

        // ✅ Filename with date range
        const fileName = `fleet_summary_${fromDate.format("YYYY-MM-DD")}_to_${toDate.format("YYYY-MM-DD")}.pdf`;

        // ✅ Set PDF title (helps when user saves from browser)
        pdf.setProperties({
            title: fileName,
        });

        // ✅ Open in new tab
        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    };

    const handleFilterChange = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <Box sx={{ width: '100%', margin: "left", mt: 4 }}>

            <Card sx={{ p: 3, borderRadius: 3, bgcolor: "#334155" }}>

                {/* Header */}
                <Box display="flex" alignItems="center" gap={2}>
                    <LayersIcon sx={{ fontSize: 40 }} />
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ color: "var(--text-primary)" }}
                        >
                            Fleet Summary Report
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: "var(--text-secondary)", mt: 0 }}
                        >
                            Quick overview of entire solar fleet performance
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} sx={{ mt: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* From Date */}
                        <SolarDatePicker
                            label="From Date"
                            value={filters.fromDate}
                            onChange={(newValue) => handleFilterChange("fromDate", newValue)}
                        />

                        {/* To Date */}
                        <SolarDatePicker
                            label="To Date"
                            value={filters.toDate}
                            onChange={(newValue) => handleFilterChange("toDate", newValue)}
                        />
                    </LocalizationProvider>
                </Box>

                <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
                    Report Includes
                    <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                        <li>Total Sites</li>
                        <li>Total Inverters</li>
                        <li>Online / Offline Inverters Count</li>
                        <li>Active Alerts</li>
                        <li>Average PR</li>
                        <li>Total Output</li>
                    </ul>
                </Alert>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} alignItems="center">

                    <Button
                        variant="contained"
                        startIcon={
                            <img
                                src="/public/csv.png" // <-- replace with your PNG path
                                alt="CSV"
                                style={{ width: 20, height: 20 }} // adjust size
                            />
                        }
                        onClick={() => {
                            const { fromDate, toDate } = filters;

                            // Check if both dates are provided
                            if (!fromDate || !toDate) {
                                alert("Please select both From and To dates before exporting.");
                                return;
                            }

                            // Optional: check that fromDate is before toDate
                            const from = new Date(fromDate);
                            const to = new Date(toDate);
                            if (from > to) {
                                alert("From Date cannot be after To Date.");
                                return;
                            }

                            // All good → call export
                            exportReportFile("fleet-summary", "csv", filters);
                        }}
                    >
                        Export CSV
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<img src="/pdf.png" alt="PDF" style={{ width: 20, height: 20 }} />}
                        onClick={handleExportPdf}
                    >
                        Export PDF
                    </Button>
                </Box>
            </Card>
            <div
                ref={reportRef}
                style={{
                    position: "absolute",
                    top: "-9999px",
                    left: "-9999px",
                }}
            >
                <FleetSummaryReportPdfLayout filters={filters} />
            </div>
        </Box>
    );
}