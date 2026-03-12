import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Divider,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import WarningIcon from '@mui/icons-material/Warning';

export default function AlertsReport() {
    const [filters, setFilters] = useState({
        reportType: "",
        status: "",
        site: "",
        severity: "",
        category: "",
        fromDate: null as Dayjs | null,
        toDate: null as Dayjs | null,
    });
    // const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    // const [toDate, setToDate] = useState<Dayjs | null>(null);

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
        <Box sx={{ maxWidth: 1100, margin: "auto", mt: 4 }}>

            <Card sx={{ p: 3, borderRadius: 3, bgcolor: "#334155" }}>

                {/* Header */}

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <WarningIcon />
                        <Typography variant="h6" fontWeight={600} sx={{ color: 'var(--text-primary)' }}>
                            Alerts Report
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ color: 'var(--text-secondary)', mt: 1 }}>
                    Export comprehensive history of system alerts, faults, and warnings with advanced filtering.
                </Typography>

                <Box display="flex" gap={2} alignItems="center" sx={{ mt: 2 }}>

                    {/* Status */}
                    <FormControl sx={{ minWidth: 300, maxWidth: 350 }}>
                        <InputLabel
                            sx={{
                                color: "white",
                                "&.Mui-focused": { color: "white" },
                            }}
                        >
                            Status
                        </InputLabel>
                        <Select
                            value={filters.status}
                            label="Status"
                            onChange={(e) => handleFilterChange("status", e.target.value)}
                            sx={{
                                color: "white",
                                height: 40, // slightly taller
                                ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                ".MuiSvgIcon-root": { color: "white" },
                            }}
                        >
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="acknowledged">Acknowledged</MenuItem>
                            <MenuItem value="resolved">Resolved</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Site */}
                    <FormControl sx={{ minWidth: 300, maxWidth: 350 }}>
                        <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
                            Site
                        </InputLabel>
                        <Select
                            value={filters.site}
                            label="Site"
                            onChange={(e) => handleFilterChange("site", e.target.value)}
                            sx={{
                                color: "white",
                                height: 40,
                                ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                ".MuiSvgIcon-root": { color: "white" },
                            }}
                        >
                            <MenuItem value="active">Site 1</MenuItem> // bind the api
                            <MenuItem value="inactive">Site 2</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Severity */}
                    <FormControl sx={{ minWidth: 300, maxWidth: 350 }}>
                        <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }}>
                            Severity
                        </InputLabel>
                        <Select
                            value={filters.severity}
                            label="Severity"
                            onChange={(e) => handleFilterChange("severity", e.target.value)}
                            sx={{
                                color: "white",
                                height: 40,
                                ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                ".MuiSvgIcon-root": { color: "white" },
                            }}
                        >
                            <MenuItem value="today">Warning</MenuItem>
                            <MenuItem value="week">Critical</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <Box display="flex" gap={2} alignItems="center" sx={{ mt: 2 }}>

                        {/* From Date */}
                        <DatePicker
                            label="From Date"
                            value={filters.fromDate}
                            onChange={(newValue) => handleFilterChange("fromDate", newValue)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        minWidth: 230,
                                        maxWidth: 260,
                                        height: 42,
                                        "& input": {
                                            color: "white",
                                            WebkitTextFillColor: "white", // selected/typed date
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "white", // label
                                            "&.Mui-focused": { color: "white" },
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white", // border
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white", // hover border
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white", // focused border
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "white", // calendar icon
                                        },
                                    },
                                },
                            }}
                        />

                        {/* To Date */}
                        <DatePicker
                            label="To Date"
                            value={filters.toDate}
                            onChange={(newValue) => handleFilterChange("toDate", newValue)}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: {
                                        minWidth: 230,
                                        maxWidth: 260,
                                        height: 42,
                                        "& input": {
                                            color: "white",
                                            WebkitTextFillColor: "white",
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "white",
                                            "&.Mui-focused": { color: "white" },
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "white",
                                        },
                                    },
                                },
                            }}
                        />

                        {/* Buttons */}
                        <Button variant="contained" onClick={() => console.log("Generate report")}>
                            Today
                        </Button>
                        <Button variant="contained" onClick={() => console.log("Generate report")}>
                            Last 7 Days
                        </Button>
                        <Button variant="contained" onClick={() => console.log("Generate report")}>
                            Last 30 Days
                        </Button>

                    </Box>
                </LocalizationProvider>

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