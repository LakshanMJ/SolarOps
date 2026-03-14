import React, { useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Divider,
    MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import WarningIcon from '@mui/icons-material/Warning';
import SolarSelect from "@/utils/SolarSelect";
import SolarDatePicker from "@/utils/SolarDatePicker";
import { getTimestampedFilename } from "@/utils/getTimestampedFilename";

export default  function AlertsReport({metaData}:any) {


    const [filters, setFilters] = useState({
        reportType: "",
        status: "",
        site: "",
        severity: "",
        category: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    console.log(filters, 'filters')

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
                a.download = getTimestampedFilename("alerts_report", "csv");
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
                a.download = getTimestampedFilename("alerts_report", "pdf");
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
                    <WarningIcon sx={{ fontSize: 40 }} />

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{ color: "var(--text-primary)" }}
                        >
                            Alerts Report
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: "var(--text-secondary)", mt: 0 }}
                        >
                            Export comprehensive history of system alerts, faults, and warnings with advanced filtering.
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} sx={{ mt: 0 }}>
                    {/* Status */}
                    <SolarSelect
                        label="Status"
                        value={filters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="acknowledged">Acknowledged</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                    </SolarSelect>

                    {/* Site */}
                    <SolarSelect
                        label="Site"
                        value={filters.site}
                        onChange={(e) => handleFilterChange("site", e.target.value)}
                    >
                        <MenuItem value="active">Site 1</MenuItem>
                        <MenuItem value="inactive">Site 2</MenuItem>
                    </SolarSelect>

                    {/* Severity */}
                    {/* <SolarSelect
                        label="Severity"
                        value={filters.severity}
                        onChange={(e) => handleFilterChange("severity", e.target.value)}
                    >
                        {metaData?.alertSeverity.map((severity) => (
                            <MenuItem key={severity} value={severity.toLowerCase()}>
                                {severity}
                            </MenuItem>
                        ))}
                    </SolarSelect> */}
                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" gap={2} alignItems="center" sx={{ mt: 2 }} flexWrap="wrap">

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

                        {/* Buttons */}
                        <Button
                            variant="contained"
                            sx={{ minWidth: 80, height: 35 }}
                            onClick={() => console.log("Generate report")}
                        >
                            Today
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ minWidth: 100, height: 35 }}
                            onClick={() => console.log("Generate report")}
                        >
                            Last 7 Days
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ minWidth: 120, height: 35 }}
                            onClick={() => console.log("Generate report")}
                        >
                            Last 30 Days
                        </Button>

                    </Box>
                </LocalizationProvider>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} alignItems="center" sx={{ mt: 2 }}>

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