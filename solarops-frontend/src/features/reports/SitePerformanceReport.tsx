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
    TextField,
    Alert
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function SitePerformanceReport() {
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);
    const [reportType, setReportType] = useState("");

    const handleChange = (event) => {
        setReportType(event.target.value);
    };

    return (
        <Box sx={{ width: '100%', margin: "left", mt: 4 }}>

            <Card sx={{ p: 3, borderRadius: 3 }}>

                {/* Header */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>

                        <AssessmentIcon />

                        <Typography variant="h6" fontWeight={600}>
                            Site Performance Report
                        </Typography>

                    </Box>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" gap={2}>

                        {/* Select */}
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Report Type</InputLabel>
                            <Select
                                value={reportType}
                                label="Report Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="sales">Sales</MenuItem>
                                <MenuItem value="users">Users</MenuItem>
                                <MenuItem value="orders">Orders</MenuItem>
                            </Select>
                        </FormControl>

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

                    </Box>
                </LocalizationProvider>

                <Alert variant="outlined" severity="info">
                    Report Includes
                    Energy production vs Expected
                    Performance Ratio (PR) analysis
                    Inverter availability breakdown
                </Alert>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" gap={2}>
                    <Button variant="contained">
                        Generate Report
                    </Button>

                    <Button variant="outlined">
                        Export CSV
                    </Button>
                </Box>

            </Card>

        </Box>
    );
}