import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Divider,
    Chip
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function FleetSummaryReport() {
    return (
        <Box sx={{ maxWidth: 1100, margin: "auto", mt: 4 }}>

            <Card sx={{ p: 3, borderRadius: 3 }}>

                {/* Header */}

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>

                        <AssessmentIcon />

                        <Typography variant="h6" fontWeight={600}>
                            Fleet Summary Report
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Quick overview of entire solar fleet performance.
                        </Typography>

                    </Box>
                </Box>

                {/* <Box mt={3}>

                    <Grid container spacing={3}>

                    </Grid>

                </Box> */}

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