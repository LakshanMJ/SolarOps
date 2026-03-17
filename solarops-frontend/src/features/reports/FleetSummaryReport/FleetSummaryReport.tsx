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
import SolarSelect from "@/utils/SolarSelect";
import SolarDatePicker from "@/utils/SolarDatePicker";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LayersIcon from '@mui/icons-material/Layers';
import { exportReportFile } from "@/utils/exportFile";
import { getTimestampedFilename } from "@/utils/getTimestampedFilename";
import { FleetPerformanceReportPdf } from "@/utils/pdf/FleetPerformanceReportPdf";
import { useNavigate } from "react-router-dom";

export default function FleetSummaryReport(metaData: any) {
    // const navigate = useNavigate();
    const reportRef = useRef(null);
    const [filters, setFilters] = useState({
        reportType: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    const handleExportPDF = () => {
        fetch("/api/export/pdf", {
            method: "POST",
            body: JSON.stringify(filters),
        })
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = getTimestampedFilename("alerts_report", "pdf"); // dynamic filename
                a.click();
                window.URL.revokeObjectURL(url);
            });
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
                        startIcon={<img src="/public/pdf.png" alt="PDF" style={{ width: 20, height: 20 }} />}
                        onClick={() => {
                            const { fromDate, toDate } = filters;

                            if (!fromDate || !toDate) {
                                alert("Please select both From and To dates before exporting.");
                                return;
                            }

                            const apiUrl = `http://localhost:4000/api/reports/fleet-summary/export?format=pdf&fromDate=${fromDate}&toDate=${toDate}`;
                            window.open(apiUrl, "_blank"); // opens PDF in a new tab
                        }}
                    >
                        Export PDF
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}