import { Box, Typography } from "@mui/material";
import FleetSummaryReport from "./FleetSummaryReport";
import SitePerformanceReport from "./SitePerformanceReport";
import AlertsReport from "./AlertsReport";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";

const Reports = () => {

    const [metaData, setMetaData] = useState([])
    console.log(metaData,'metaData')
    const fetchMetadata = async () => {
        try {
            const res = await fetchData(
                `${BACKEND_URLS.METADATA}`,
                { method: "GET" }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch metadata");
            }

            const data = await res.json();
            setMetaData(data)
        } catch (error) {
            console.error("Metadata fetch error:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchMetadata();
    }, []);

    return (
        <Box
            sx={{
                height: 1300,
                width: "100%",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
                Reports
            </Typography>

            <Box>
                <FleetSummaryReport metaData={metaData}/>
            </Box>

            <Box>
                <SitePerformanceReport metaData={metaData}/>
            </Box>

            <Box>
                <AlertsReport metaData={metaData}/>
            </Box>
        </Box>
    );
}

export default Reports;