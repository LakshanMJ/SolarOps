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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                            <Typography variant="h6" sx={{ color: '#ffffff' }}>
                                {inverter?.name}
                            </Typography>
                            {inverter.status !== 'Offline' && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Box sx={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#22c55e',
                                            borderRadius: '50%',
                                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                                        }} />
                                        <Box sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#22c55e',
                                            borderRadius: '50%',
                                            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                                        }} />
                                    </Box>
                                    <Typography component="span" sx={{
                                        fontSize: '12px',
                                        color: '#4ade80',
                                        fontWeight: 500
                                    }}>
                                        LIVE
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <SolarStatusChip status={inverter?.status} />

                        <Box
                            component="img"
                            src="inverter_images/inverter.png"
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
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                // color: 'var(--text-secondary)',
                                fontSize: '12px',
                                letterSpacing: '0.05em',
                                color: '#94a3b8',
                                marginBottom: '12px',
                                margin: 0
                            }}
                        >
                            Overview
                        </Typography>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Site:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter.site}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Manufacturer:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'Manufacturer_name'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Serial Number:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'serial_number'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Model:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'SG60CX'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Firmware version:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'v1.2.3'}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Capacity:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'60 kW'}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                // color: 'var(--text-secondary)',
                                fontSize: '12px',
                                letterSpacing: '0.05em',
                                color: '#94a3b8',
                                marginBottom: '12px',
                                margin: 0
                            }}
                        >
                            Live Metrics
                        </Typography>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Output:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter.currentOutput} kW
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Temp:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter.temp} °C
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                PR:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter.pr}%
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                // color: 'var(--text-secondary)',
                                fontSize: '12px',
                                letterSpacing: '0.05em',
                                color: '#94a3b8',
                                marginBottom: '12px',
                                margin: 0
                            }}
                        >
                            Alerts
                        </Typography>
                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Last fault:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'Grid voltage fluctuation'}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default InverterDrawer;
