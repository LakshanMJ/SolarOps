import { Box,Typography } from "@mui/material";
import FleetSummaryReport from "./FleetSummaryReport";
import SitePerformanceReport from "./SitePerformanceReport";
import AlertsReport from "./AlertsReport";

const Reports = () => {

    return (
        <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                Reports
            </Typography>
            
            <FleetSummaryReport />

            <SitePerformanceReport />

            <AlertsReport />
            
        </Box>
    );
}

export default Reports;