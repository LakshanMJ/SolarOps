import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface Alert {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: string;
    inverterId: string;
}

// Map severity to color
const severityColor = {
    critical: 'red',
    warning: 'orange',
    info: 'green',
};

export default function LiveAlertsFeed() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    // Simulate WebSocket updates
    useEffect(() => {
        // Example: Replace with the WebSocket connection
        const wsSimulator = setInterval(() => {
            const newAlert: Alert = {
                id: Math.random().toString(36).substr(2, 9),
                severity: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)] as Alert['severity'],
                message: `Inverter issue detected`,
                timestamp: new Date().toISOString(),
                inverterId: `INV-${Math.floor(Math.random() * 100)}`,
            };
            setAlerts(prev => [newAlert, ...prev].slice(0, 10));
        }, 5000);

        return () => clearInterval(wsSimulator);
    }, []);

    return (
        <>
            <Typography variant="h6" >
                Live Alerts
            </Typography>
            <Box
                sx={{
                    width: 320,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    padding: 2,
                    overflowY: 'auto',
                    maxHeight: '400px',
                    boxShadow: 1,
                }}
            >
                <List disablePadding>
                    {alerts.map(alert => (
                        <ListItem key={alert.id} sx={{ paddingY: 1 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <FiberManualRecordIcon sx={{ color: severityColor[alert.severity], fontSize: 14 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={{ fontWeight: 500 }} gutterBottom color="text.primary">
                                        {alert.message}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="caption" sx={{ color: '#555' }}>
                                            {alert.timestamp.split('T')[1].split('.')[0]} | {alert.inverterId}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                {alerts.length === 0 && (
                    <Typography variant="body2" color="text.secondary" align="center">
                        No active alerts
                    </Typography>
                )}
            </Box>
        </>
    );
}
