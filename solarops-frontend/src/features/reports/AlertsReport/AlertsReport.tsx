import React, { useRef, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Divider,
    MenuItem,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import WarningIcon from '@mui/icons-material/Warning';
import SolarSelect from "@/utils/SolarSelect";
import SolarDatePicker from "@/utils/SolarDatePicker";
import dayjs from "dayjs";
import { exportReportFile } from "@/utils/reports/exportCsv";
import { exportMultiPagePdf } from "@/utils/reports/exportMultiPagePdf";
import SolarExportPdfButton from "@/utils/SolarExportPdfButton";
import SolarExportCsvButton from "@/utils/SolarExportCsvButton";

export default function AlertsReport({ metaData, sites }: any) {

    const [alignment, setAlignment] = useState('');
    const [filters, setFilters] = useState({
        reportType: "",
        status: "",
        siteId: "",
        severity: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });

    const reportRef = useRef<HTMLDivElement>(null);

    const handleFilterChange = (field: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value
        }));
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
                        {metaData?.alertStatus?.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </SolarSelect>

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

                    {/* Severity */}
                    <SolarSelect
                        label="Severity"
                        value={filters.severity}
                        onChange={(e) => handleFilterChange("severity", e.target.value)}
                    >
                        {metaData?.alertSeverity?.map((severity) => (
                            <MenuItem key={severity} value={severity}>
                                {severity}
                            </MenuItem>
                        ))}
                    </SolarSelect>
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
                    </Box>
                </LocalizationProvider>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2} alignItems="center" sx={{ mt: 2 }}>
                    <SolarExportCsvButton
                        onClick={() => exportReportFile("alerts", filters)}
                    />
                    <SolarExportPdfButton
                        onClick={() => exportMultiPagePdf("alerts", filters)}
                    />
                </Box>
            </Card>
        </Box>
    );
}