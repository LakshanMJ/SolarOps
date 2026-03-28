import { BACKEND_URLS } from '@/backendUrls';
import LiveIndicator from '@/utils/LiveIndicator';
import SolarStatusChip from '@/utils/SolarStatusChip';
import { Drawer, Box, Typography, Divider } from '@mui/material';

type Status = 'Online' | 'Degraded' | 'Critical' | 'Offline';

interface Inverter {
    id?: string | null;
    name: string;
    status: Status
    siteId: string;
    siteName: string;
    manufacturerId: string;
    manufacturerName: string;
    serialNumber: string;
    model: string;
    firmwareVersion: string;
    capacityKw: number | null;
    installedAt: string;
    image: File | string | null;
}

interface InverterDrawerProps {
    open: boolean;
    inverter: Inverter | null;
    onClose: () => void;
}


const InverterDrawer = ({ open, inverter, onClose }: InverterDrawerProps) => {
    console.log(inverter, 'inverterrrr')
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
                            // src="inverter_images/inverter.png"
                            src={inverter.image
                                ? `${BACKEND_URLS.IMAGE_PATH}/${inverter.image}`
                                : '/pdf.png'}  // add default fallback image !!!!!!!!
                            alt={inverter.name || 'User'}
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
                                {inverter.siteName}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Manufacturer:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter?.manufacturerName}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Serial Number:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter?.serialNumber}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Model:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter?.model}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Firmware version:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter?.firmwareVersion}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Capacity:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter?.capacityKw} Kw
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
                                {'inverter.currentOutput'} kW
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Temp:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'inverter.temp'} °C
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                PR:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {'inverter.pr'}%
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
                            Commissioning Details
                        </Typography>
                        <Box sx={{ mb: 0.5 }}>
                            <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                                Installation Date:
                            </Typography>
                            <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                                {inverter?.installedAt
                                    ? new Date(inverter.installedAt).toLocaleString()
                                    : 'N/A'}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default InverterDrawer;
