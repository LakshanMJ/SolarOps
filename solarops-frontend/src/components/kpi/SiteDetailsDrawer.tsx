import { BACKEND_URLS } from '@/backendUrls';
import StatusChip from '@/utils/SolarStatusChip';
import { Drawer, Box, Typography, Divider, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export type SiteDetails = {
    id: string;
    name: string;
    location: string;
    lat: number;
    lng: number;
    capacity: number;
    activeInverters: number;
    alerts: number;
    avgInverterPowerMW: number;
    health: string;
    image?: string | null;
};

interface SiteDetailsDrawerProps {
    open: boolean;
    site: SiteDetails | null;
    onClose: () => void;
}

const siteHealthConfig = {
    good: {
        sx: {
            backgroundColor: 'rgba(34,197,94,0.2)',
            color: '#4ade80',
            border: '1px solid rgba(34,197,94,0.3)',
        },
    },
    critical: {
        sx: {
            backgroundColor: 'rgba(239,68,68,0.2)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.3)',
        },
    },
    warning: {
        sx: {
            backgroundColor: 'rgba(245,158,11,0.2)',
            color: '#fbbf24',
            border: '1px solid rgba(245,158,11,0.3)',
        },
    },
    unknown: {
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

const SiteDetailsDrawer = ({ open, site, onClose }: SiteDetailsDrawerProps) => {

    const [imageLoading, setImageLoading] = useState(true);

    console.log(site, 'site')

    useEffect(() => {
        setImageLoading(true);
    }, [site?.image, open]);

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{
                width: 340,
                p: 2,
                backgroundColor: "#273443",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}>
                {site && (
                    <>
                        <Typography variant="h6" sx={{ color: '#ffffff', mb: 0.5 }}>
                            {site.name}
                        </Typography>
                        <Box sx={{}}>
                            <StatusChip status={site.health} config={siteHealthConfig} />
                        </Box>

                        <Box sx={{ position: "relative", mt: 2, mb: 2 }}>
                            {imageLoading && (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 250,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            )}

                            {site.image ? (
                                <Box
                                    component="img"
                                    src={`${BACKEND_URLS.IMAGE_PATH}/${site.image}`}
                                    alt={site.name}
                                    onLoad={() => setImageLoading(false)}
                                    onError={() => setImageLoading(false)}
                                    sx={{
                                        width: "100%",
                                        maxHeight: 500,
                                        objectFit: "contain",
                                        borderRadius: 1,
                                        p: 1,
                                        backgroundColor: "transparent",
                                        display: imageLoading ? "none" : "block",
                                    }}
                                />
                            ) : (
                                <Box
                                onLoad={() => setImageLoading(false)}
                                    onError={() => setImageLoading(false)}
                                    component="img"
                                    src="/img_placeholder.png"
                                    sx={{
                                        width: "90%",
                                        maxHeight: 200,
                                        objectFit: "contain",
                                    }}
                                />
                            )}

                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Typography variant="subtitle2" gutterBottom sx={sectionTitleSx}>
                            Overview
                        </Typography>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Location:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.location || 'N/A'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Coordinates:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.lat != null && site.lng != null
                                    ? `${site.lat.toFixed(6)}, ${site.lng.toFixed(6)}`
                                    : 'N/A'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Capacity:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.capacity != null ? `${site.capacity} MW` : 'N/A'}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" gutterBottom sx={sectionTitleSx}>
                            Operations
                        </Typography>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Active inverters:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.activeInverters != null ? site.activeInverters : 'N/A'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Alerts:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.alerts != null ? site.alerts : 'N/A'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Avg inverter power:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.avgInverterPowerMW != null ? `${site.avgInverterPowerMW} MW` : 'N/A'}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" gutterBottom sx={sectionTitleSx}>
                            Site health
                        </Typography>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Status:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {site.health || 'N/A'}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default SiteDetailsDrawer;
