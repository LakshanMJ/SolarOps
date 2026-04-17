import React, { useRef, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Divider,
    MenuItem,
    Alert,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import SolarSelect from "@/utils/SolarSelect";
import SolarDatePicker from "@/utils/SolarDatePicker";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { exportReportFile } from "@/utils/reports/exportCsv";
import handleExportPdf from "@/utils/reports/exportPdf";
import dayjs from "dayjs";
import SolarExportCsvButton from "@/utils/SolarExportCsvButton";
import SolarExportPdfButton from "@/utils/SolarExportPdfButton";


export default function SitePerformanceReport({ metaData, sites }: any) {
    const [alignment, setAlignment] = useState('');
    const [filters, setFilters] = useState({
        reportType: "",
        siteId: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    const handleFilterChange = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleToggleButtonChange = (_: any, newAlignment: string | null) => {
        if (newAlignment) setAlignment(newAlignment);

        const today = dayjs();
        if (newAlignment === "today") {
            setFilters((prev) => ({
                ...prev,
                fromDate: today,
                toDate: today,
            }));
        } else if (newAlignment === "last7Days") {
            setFilters((prev) => ({
                ...prev,
                fromDate: today.subtract(6, "day"),
                toDate: today,
            }));
        } else if (newAlignment === "last30Days") {
            setFilters((prev) => ({
                ...prev,
                fromDate: today.subtract(29, "day"),
                toDate: today,
            }));
        }
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

                        {/* Buttons */}
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleToggleButtonChange}
                            aria-label="Platform"
                            sx={{
                                display: "flex",
                                gap: 2,
                                "& .MuiToggleButton-root": {
                                    minWidth: 80,
                                    height: 35,
                                    borderRadius: 1,
                                    border: "1px solid",
                                    borderColor: "primary.main",
                                    textTransform: "none",
                                },
                                "& .MuiToggleButton-root.Mui-selected": {
                                    backgroundColor: "primary.dark",
                                    color: "white",
                                },
                            }}
                        >
                            <ToggleButton value="today">Today</ToggleButton>
                            <ToggleButton value="last7Days">Last 7 Days</ToggleButton>
                            <ToggleButton value="last30Days">Last 30 Days</ToggleButton>
                        </ToggleButtonGroup>
                    </LocalizationProvider>
                </Box>

                <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
                    Report Includes
                    <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                        <li>Total Inverters</li>
                        <li>Active Inverters</li>
                        <li>Alerts Count</li>
                        <li>Average Output</li>
                        <li>Average PR</li>
                        <li>Health</li>
                        <li>Energy Produced</li>
                        <li>Downtime Percentage</li>
                        <li>Alert Rate</li>
                    </ul>
                </Alert>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} alignItems="center">
                    <SolarExportCsvButton
                        onClick={() => {
                            const { fromDate, toDate, siteId } = filters;

                            if (!fromDate || !toDate) {
                                alert("Please select both From and To dates before exporting.");
                                return;
                            }

                            if (!siteId) {
                                alert("Please select a site before exporting.");
                                return;
                            }

                            const from = new Date(fromDate);
                            const to = new Date(toDate);
                            if (from > to) {
                                alert("From Date cannot be after To Date.");
                                return;
                            }

                            exportReportFile("site-performance", filters);
                        }}
                    />
                    <SolarExportPdfButton
                        onClick={() => handleExportPdf("site-performance", filters)}
                    />
                </Box>
            </Card>
        </Box>
    );
}