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
    MenuItem
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function AlertsReport() {
    const [reportType, setReportType] = useState("");
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");

    const handleChange = (event) => {
        setReportType(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 1100, margin: "auto", mt: 4 }}>

            <Card sx={{ p: 3, borderRadius: 3 }}>

                {/* Header */}

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>

                        <AssessmentIcon />

                        <Typography variant="h6" fontWeight={600}>
                            Alerts Report
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Export comprehensive history of system alerts, faults, and warnings with advanced filtering.
                        </Typography>

                    </Box>
                </Box>

                <Box display="flex" gap={2}>

                    {/* Report Type */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                            value={reportType}
                            label="Report Type"
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <MenuItem value="sales">Sales</MenuItem>
                            <MenuItem value="users">Users</MenuItem>
                            <MenuItem value="orders">Orders</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Status */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Category */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">This Week</MenuItem>
                            <MenuItem value="month">This Month</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" gap={2}>

                        {/* From Date */}
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                            slotProps={{ textField: { size: "small" } }}
                        />

                        {/* To Date */}
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                            slotProps={{ textField: { size: "small" } }}
                        />

                        <Button
                            variant="contained"
                            onClick={() => console.log("Generate report")}
                        >
                            Today
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => console.log("Generate report")}
                        >
                            Last 7 Days
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => console.log("Generate report")}
                        >
                            Last 30 Days
                        </Button>

                    </Box>
                </LocalizationProvider>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2}>
                    <Button variant="contained">
                        Export CSV
                    </Button>

                    <Button variant="outlined">
                        Export PDF
                    </Button>
                </Box>

            </Card>

        </Box>
    );
}