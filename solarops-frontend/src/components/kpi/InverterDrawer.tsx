import LiveIndicator from '@/utils/LiveIndicator';
import SolarStatusChip from '@/utils/SolarStatusChip';
import { Drawer, Box, Typography, Divider } from '@mui/material';

type Status = 'Online' | 'Degraded' | 'Critical' | 'Offline';

interface Inverter {
    inverterId: string;
    site: string;
    status: Status;
    currentOutput: number;
    temp: number;
    pr: number;
    details: string;
}

interface InverterDrawerProps {
    open: boolean;
    inverter: Inverter | null;
    onClose: () => void;
}

const InverterDrawer = ({ open, inverter, onClose }: InverterDrawerProps) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 340, p: 2, backgroundColor: '#273443' }}>
                {inverter && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                {inverter.inverterId}
                            </Typography>
                            {inverter.status !== 'Offline' && <LiveIndicator />}
                        </Box>

                        <SolarStatusChip status={inverter?.status} />

                        <Box
                            component="img"
                            src="/inverter.png"
                            alt="Inverter"
                            sx={{
                                width: '100%',
                                maxHeight: 250,
                                objectFit: 'contain',
                                borderRadius: 1,
                                mb: 2,
                                p: 1,
                                filter: inverter.status === 'Offline'
                                    ? 'grayscale(100%) contrast(0.8) brightness(0.8)'
                                    : 'none',
                                opacity: inverter.status === 'Offline' ? 0.5 : 1,
                                transition: 'filter 0.3s ease-in-out',
                                backgroundColor: 'transparent',
                            }}
                        />

                        <Divider sx={{ mb: 2 }} />

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                fontWeight: 1000,
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.06em',
                            }}
                        >
                            Overview
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#fff' }}>Site: {inverter.site}</Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>Model: SG60CX</Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>Firmware version: v1.2.3</Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>Capacity: 60 kW</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                fontWeight: 1000,
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.06em',
                            }}
                        >
                            Live Metrics
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>Output: {inverter.currentOutput} kW</Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>Temp: {inverter.temp} °C</Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>PR: {inverter.pr}%</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                fontWeight: 1000,
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.06em',
                            }}
                        >
                            Alerts
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fff' }}>Last fault: Grid voltage fluctuation</Typography>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default InverterDrawer;
