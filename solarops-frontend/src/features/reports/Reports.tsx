import { Box, Typography } from "@mui/material";
import FleetSummaryReport from "./FleetSummaryReport/FleetSummaryReport";
import SitePerformanceReport from "./SitePerformanceReport/SitePerformanceReport";
import AlertsReport from "./AlertsReport/AlertsReport";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";

const Reports = () => {

    const [metaData, setMetaData] = useState([])
    const [sites, setSites] = useState([]);

    const fetchMetadata = async () => {
        try {
            const res = await fetchData(
                `${BACKEND_URLS.METADATA}`,
                { method: "GET" }
            );
            setMetaData(res)
        } catch (error) {
            console.error("Metadata fetch error:", error);
            throw error;
        }
    };

    const fetchSites = async () => {
        try {
            const siteData = await fetchData(BACKEND_URLS.SITES);
            setSites(siteData);
        } catch (err) {
            console.error("Failed to load site data:", err);
        }
    };

    useEffect(() => {
        fetchMetadata();
        fetchSites();
    }, []);

    return (
        <Box
            sx={{
                height: 1300,
                width: "100%",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                mb: 22,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                Reports
            </Typography>

            <Box>
                <FleetSummaryReport metaData={metaData}/>
            </Box>

            <Box>
                <SitePerformanceReport metaData={metaData} sites={sites}/>
            </Box>

            <Box>
                <AlertsReport metaData={metaData} sites={sites}/>
            </Box>
        </Box>
    );
}

export default Reports;