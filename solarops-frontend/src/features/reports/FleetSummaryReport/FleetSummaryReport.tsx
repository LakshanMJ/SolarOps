import { useRef, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Divider,
    Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import SolarDatePicker from "@/utils/SolarDatePicker";
import LayersIcon from '@mui/icons-material/Layers';
import { exportReportFile } from "@/utils/reports/exportCsv";
import handleExportPdf from "@/utils/reports/exportPdf";

export default function FleetSummaryReport(metaData: any) {
    const [filters, setFilters] = useState({
        reportType: "",
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
                            exportReportFile("fleet-summary", filters);
                        }}
                    >
                        Export CSV
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<img src="/pdf.png" alt="PDF" style={{ width: 20, height: 20 }} />}
                        onClick={() => handleExportPdf("fleet-summary", filters, reportRef)}
                    >
                        Export PDF
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}