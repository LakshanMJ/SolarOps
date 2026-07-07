// import { BACKEND_URLS } from '@/backendUrls';
import StatusChip from '@/utils/SolarStatusChip';
import { Drawer, Box, Typography, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

type Status = 'Online' | 'Degraded' | 'Critical' | 'Offline';

const inverterStatusConfig = {
    online: {
        sx: {
            backgroundColor: 'rgba(34,197,94,0.2)',
            color: '#4ade80',
            border: '1px solid rgba(34,197,94,0.3)',
        },
    },
    degraded: {
        sx: {
            backgroundColor: 'rgba(245,158,11,0.2)',
            color: '#fbbf24',
            border: '1px solid rgba(245,158,11,0.3)',
        },
    },
    critical: {
        sx: {
            backgroundColor: 'rgba(239,68,68,0.2)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.3)',
        },
    },
    offline: {
        sx: {
            backgroundColor: 'rgba(107,114,128,0.2)',
            color: '#9ca3af',
            border: '1px solid rgba(107,114,128,0.3)',
        },
    },
};

const sectionTitleSx = {
    fontWeight: 900,
    textTransform: 'uppercase' as const,
    fontSize: '12px',
    letterSpacing: '0.05em',
    color: '#94a3b8',
    marginBottom: '12px',
    margin: 0,
};


interface Inverter {
    id?: string | null;
    name: string;
    status: Status;
    siteId: string;
    siteName: string;
    manufacturerId: string;
    manufacturerName: string;
    serialNumber: string;
    model: string;
    firmwareVersion: string;
    capacityKw: number | null;
    installedAt: string;
    capacityUtilization: string;
    image: File | string | null;
    tempC: number;
    outputKw: number;
}

interface InverterDrawerProps {
    open: boolean;
    inverter: Inverter | null;
    onClose: () => void;
}


const InverterDrawer = ({ open, inverter, onClose }: InverterDrawerProps) => {

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        setImageLoading(true);
    }, [inverter?.image, open]);


    const imageSrc = inverter?.image
        ? typeof inverter.image === "string"
            ? inverter.image
            : URL.createObjectURL(inverter.image)
        : "/img_placeholder.png";


    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 340,
                    p: 2,
                    backgroundColor: "#273443",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                {inverter && (
                    <>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Typography variant="h6" sx={{ color: "#fff" }}>
                                {inverter.name}
                            </Typography>

                            {inverter.status !== "Offline" && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            bgcolor: "#22c55e",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            color: "#4ade80",
                                            fontWeight: 600
                                        }}
                                    >
                                        LIVE
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{}}>
                            <StatusChip
                                status={inverter.status}
                                config={inverterStatusConfig}
                            />
                        </Box>

                        {/* IMAGE */}
                        <Box sx={{ position: "relative", mt: 2, mb: 2 }}>

                            {imageLoading && (
                                <Box
                                    sx={{
                                        height: 250,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            )}


                            <Box
                                component="img"
                                src={imageSrc}
                                alt={inverter.name}
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                                sx={{
                                    width: "100%",
                                    maxHeight: 250,
                                    objectFit: "contain",
                                    borderRadius: 1,
                                    p: 1,
                                    display: imageLoading ? "none" : "block",
                                    filter:
                                        inverter.status === "Offline"
                                            ? "grayscale(100%) contrast(.8) brightness(.8)"
                                            : "none",
                                    opacity:
                                        inverter.status === "Offline"
                                            ? 0.5
                                            : 1
                                }}
                            />

                        </Box>


                        <Divider sx={{ mb: 2 }} />


                        <Typography sx={sectionTitleSx}>
                            Overview
                        </Typography>


                        {[
                            ["Site", inverter.siteName],
                            ["Manufacturer", inverter.manufacturerName],
                            ["Serial Number", inverter.serialNumber],
                            ["Model", inverter.model],
                            ["Firmware version", inverter.firmwareVersion],
                            ["Capacity", inverter.capacityKw ? `${inverter.capacityKw} kW` : "N/A"],
                        ].map(([label, value]) => (
                            <Box sx={{ mb: 0.5 }} key={label}>
                                <Typography component="span" variant="body2" sx={{ color: "#cbd5e1", mr: 1 }}>
                                    {label}:
                                </Typography>

                                <Typography component="span" variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                                    {value || "N/A"}
                                </Typography>
                            </Box>
                        ))}



                        <Divider sx={{ my: 2 }} />


                        <Typography sx={sectionTitleSx}>
                            Live Metrics
                        </Typography>


                        {[
                            ["Output", inverter.outputKw ? `${inverter.outputKw} kW` : "N/A"],
                            ["Temp", inverter.tempC ? `${inverter.tempC}°C` : "N/A"],
                            ["Capacity Utilization", inverter.capacityUtilization ? `${inverter.capacityUtilization}%` : "N/A"],
                        ].map(([label, value]) => (
                            <Box sx={{ mb: 0.5 }} key={label}>
                                <Typography component="span" variant="body2" sx={{ color: "#cbd5e1", mr: 1 }}>
                                    {label}:
                                </Typography>

                                <Typography component="span" variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                                    {value}
                                </Typography>
                            </Box>
                        ))}



                        <Divider sx={{ my: 2 }} />


                        <Typography sx={sectionTitleSx}>
                            Commissioning Details
                        </Typography>


                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: "#cbd5e1", mr: 1 }}>
                                Installation Date:
                            </Typography>

                            <Typography component="span" variant="body2" sx={{ color: "#fff", fontWeight: 600 }}>
                                {
                                    inverter.installedAt
                                        ? new Date(inverter.installedAt).toLocaleString()
                                        : "N/A"
                                }
                            </Typography>
                        </Box>


                    </>
                )}

            </Box>
        </Drawer>
    );
};

export default InverterDrawer;