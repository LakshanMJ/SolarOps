import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { fetchData } from '@/utils/fetch';
import { BACKEND_URLS } from '@/backendUrls';

interface Alert {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    message: string;
    createdAt: string;
    inverterId: string;
    inverter: {
        name: string;
    }
}

const severityColor = {
    critical: 'var(--danger)',
    warning: 'var(--warning)',
    info: 'var(--info)',
};

export default function LiveAlertsFeed() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    console.log(alerts, 'alerts')

    // useEffect(() => {
    //     const wsSimulator = setInterval(() => {
    //         const newAlert: Alert = {
    //             id: Math.random().toString(36).substr(2, 9),
    //             severity: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)] as Alert['severity'],
    //             message: `Inverter issue detected`,
    //             timestamp: new Date().toISOString(),
    //             inverterId: `INV-${Math.floor(Math.random() * 100)}`,
    //         };
    //         setAlerts(prev => [newAlert, ...prev].slice(0, 10));
    //     }, 5000);

    //     return () => clearInterval(wsSimulator);
    // }, []);

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const alertData = await fetchData(BACKEND_URLS.ALERTS)

                // Map severity to lowercase
                const mappedAlerts = alertData.map((a: any) => ({
                    ...a,
                    severity: a.severity.toLowerCase(), // Warning -> warning, Critical -> critical 
                }))

                setAlerts(mappedAlerts)
            } catch (err) {
                console.error('Failed to load alert data:', err)
            }
        }

        fetchAlerts()
        const interval = setInterval(fetchAlerts, 15000)

        return () => clearInterval(interval) // cleanup on unmount
    }, [])


    return (
        <>
            <Typography
                variant="subtitle1"
                mb={1}
                sx={{ color: 'var(--text-primary)', fontWeight: 600 }}
            >
                Live Alerts
            </Typography>

            <Box
                sx={{
                    width: 320,
                    backgroundColor: '#334155',
                    borderRadius: 2,
                    p: 2,
                    overflowY: 'auto',
                    maxHeight: 400,
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-default)',
                }}
            >
                <List disablePadding>
                    {alerts.map(alert => (
                        <ListItem key={alert.id} sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                                <FiberManualRecordIcon
                                    sx={{ color: severityColor[alert.severity], fontSize: 12 }}
                                />
                            </ListItemIcon>

                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'var(--text-primary)', fontWeight: 500 }}
                                    >
                                        {alert.message}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                                        {alert.createdAt.split('T')[1].split('.')[0]} | {alert?.inverter?.name}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>

                {alerts.length === 0 && (
                    <Typography variant="body2" sx={{ color: 'var(--text-muted)' }} align="center">
                        No active alerts
                    </Typography>
                )}
            </Box>
        </>
    );
}