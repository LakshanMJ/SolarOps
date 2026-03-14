import React, { useState } from "react";
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

export default function SitePerformanceReport(metaData:any) {
    const [filters, setFilters] = useState({
        reportType: "",
        status: "",
        site: "",
        severity: "",
        category: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    const getTimestampedFilename = (prefix: string, ext: string) => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0"); // month 01–12
        const dd = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const min = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");

        return `${prefix}_${yyyy}${mm}${dd}_${hh}${min}${ss}.${ext}`;
    };

    const handleExportCSV = () => {
        fetch("/api/export/csv", {
            method: "POST",
            body: JSON.stringify(filters),
        })
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = getTimestampedFilename("alerts_report", "csv"); // dynamic filename
                a.click();
                window.URL.revokeObjectURL(url);
            });
    };

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
                    <AssessmentIcon sx={{ fontSize: 40 }} />
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ color: "var(--text-primary)" }}
                        >
                            Site Performance Report
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: "var(--text-secondary)", mt: 0 }}
                        >
                            Generate detailed performance analysisfor a specific site over a selected time period
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} sx={{ mt: 2 }}>
                    {/* Site */}
                    <SolarSelect
                        label="Site"
                        value={filters.site}
                        onChange={(e) => handleFilterChange("site", e.target.value)}
                    >
                        <MenuItem value="active">Site 1</MenuItem>
                        <MenuItem value="inactive">Site 2</MenuItem>
                    </SolarSelect>

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
                        <li>Energy production vs Expected</li>
                        <li>Performance Ratio (PR) analysis</li>
                        <li>Inverter availability breakdown</li>
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
                        onClick={handleExportCSV}
                    >
                        Export CSV
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={
                            <img
                                src="/public/pdf.png" // <-- replace with your PNG path
                                alt="PDF"
                                style={{ width: 20, height: 20 }}
                            />
                        }
                        onClick={handleExportPDF}
                    >
                        Export PDF
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}