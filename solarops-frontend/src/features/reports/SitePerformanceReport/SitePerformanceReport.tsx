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
import { exportReportFile } from "@/utils/reports/exportCsv";
import handleExportPdf from "@/utils/reports/exportPdf";

export default function SitePerformanceReport({ metaData, sites }: any) {
    const [filters, setFilters] = useState({
        reportType: "",
        siteId: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    const reportRef = useRef<HTMLDivElement>(null);

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
                        value={filters.siteId}
                        onChange={(e) => handleFilterChange("siteId", e.target.value)}
                    >
                        {sites?.map((site) => (
                            <MenuItem key={site.name} value={site.id}>
                                {site?.name}
                            </MenuItem>
                        ))}
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
                        {/* <li>siteName</li>
                        <li>region</li>
                        <li>capacityMw</li> */}
                        <li>totalInverters</li>
                        <li>activeInverters</li>
                        <li>alertsCount</li>
                        <li>avgOutput</li>
                        <li>avgPR</li>
                        <li>health</li>
                        <li>energy Produced</li>
                        <li>downtime Percentage</li>
                        <li>alert Rate</li>
                    </ul>
                </Alert>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} alignItems="center">

                    <Button
                        variant="contained"
                        startIcon={
                            <img
                                src="/public/csv.png"
                                alt="CSV"
                                style={{ width: 20, height: 20 }}
                            />
                        }
                        onClick={() => {
                            const { fromDate, toDate, siteId } = filters;

                            // Check if both dates are provided
                            if (!fromDate || !toDate) {
                                alert("Please select both From and To dates before exporting.");
                                return;
                            }

                            if (!siteId) {
                                alert("Please select a site before exporting.");
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
                            exportReportFile("site-performance", filters);
                        }}
                    >
                        Export CSV
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<img src="/pdf.png" alt="PDF" style={{ width: 20, height: 20 }} />}
                        onClick={() => handleExportPdf("site-performance", filters,reportRef)}
                    >
                        Export PDF
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}