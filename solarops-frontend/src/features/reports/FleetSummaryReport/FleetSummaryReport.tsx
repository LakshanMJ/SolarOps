import { useRef, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Divider,
    Alert,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import SolarDatePicker from "@/utils/SolarDatePicker";
import LayersIcon from '@mui/icons-material/Layers';
import { exportReportFile } from "@/utils/reports/exportCsv";
import handleExportPdf from "@/utils/reports/exportPdf";
import dayjs from "dayjs";
import SolarExportPdfButton from "@/utils/SolarExportPdfButton";
import SolarExportCsvButton from "@/utils/SolarExportCsvButton";

export default function FleetSummaryReport(metaData: any) {
    const [alignment, setAlignment] = useState('');
    const [filters, setFilters] = useState({
        reportType: "",
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

                        {/* Buttons */}
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleToggleButtonChange}
                            aria-label="Platform"
                            sx={{
                                display: "flex",
                                gap: 2, // spacing between buttons
                                "& .MuiToggleButton-root": {
                                    minWidth: 80,
                                    height: 35,
                                    borderRadius: 1,
                                    border: "1px solid",          // ✅ add border
                                    borderColor: "primary.main",  // optional: border color
                                    textTransform: "none",
                                },
                                "& .MuiToggleButton-root.Mui-selected": {
                                    backgroundColor: "primary.dark", // selected color
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
                    <SolarExportCsvButton
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
                            exportReportFile("fleet-summary", filters);
                        }}
                    />

                    <SolarExportPdfButton
                        onClick={() => handleExportPdf("fleet-summary", filters)}
                    />
                </Box>
            </Card>
        </Box>
    );
}