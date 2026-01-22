import React, { useState } from 'react';
import {
    Box,
    Chip,
    Typography,
    Drawer,
    Divider,
    Button,
} from '@mui/material';
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';

const inverterData = [
    {
        id: 1,
        inverterId: 'INV-101',
        site: 'Site A',
        status: 'healthy',
        currentOutput: 120,
        temp: 45,
        pr: 88,
        details: 'Inverter operating normally',
    },
    {
        id: 2,
        inverterId: 'INV-102',
        site: 'Site B',
        status: 'warning',
        currentOutput: 95,
        temp: 50,
        pr: 82,
        details: 'Slight underperformance',
    },
    {
        id: 3,
        inverterId: 'INV-103',
        site: 'Site C',
        status: 'critical',
        currentOutput: 40,
        temp: 70,
        pr: 60,
        details: 'Inverter offline or faulty',
    },
];

const statusColor = {
    healthy: 'success',
    warning: 'warning',
    critical: 'error',
};

export default function InverterHealthTable() {
    const [selectedInverter, setSelectedInverter] = useState<any>(null);

    const columns: GridColDef[] = [
        { field: 'inverterId', headerName: 'Inverter ID', width: 120 },
        { field: 'site', headerName: 'Site', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            renderCell: (params: GridRenderCellParams) => (
                <Chip
                    label={params.value}
                    color={statusColor[params.value as keyof typeof statusColor]}
                    size="small"
                />
            ),
        },
        { field: 'currentOutput', headerName: 'Current Output (kW)', width: 150, type: 'number' },
        { field: 'temp', headerName: 'Temp (°C)', width: 100, type: 'number' },
        { field: 'pr', headerName: 'PR (%)', width: 100, type: 'number', sortable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: () => <Button size="small" variant="outlined">View</Button>,
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Inverter Health
            </Typography>

            <DataGrid
                rows={inverterData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                onRowClick={(params) => setSelectedInverter(params.row)}
            />

            {/* Slide-over Panel */}
            <Drawer
                anchor="right"
                open={!!selectedInverter}
                onClose={() => setSelectedInverter(null)}
            >
                <Box sx={{ width: 300, p: 2 }}>
                    {selectedInverter && (
                        <>
                            <Typography variant="h6" mb={1}>
                                {selectedInverter.inverterId} Details
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="body2">
                                <strong>Site:</strong> {selectedInverter.site}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Status:</strong>{' '}
                                <Chip
                                    label={selectedInverter.status}
                                    color={statusColor[selectedInverter.status as keyof typeof statusColor]}
                                    size="small"
                                />
                            </Typography>
                            <Typography variant="body2">
                                <strong>Current Output:</strong> {selectedInverter.currentOutput} kW
                            </Typography>
                            <Typography variant="body2">
                                <strong>Temperature:</strong> {selectedInverter.temp} °C
                            </Typography>
                            <Typography variant="body2">
                                <strong>PR:</strong> {selectedInverter.pr} %
                            </Typography>
                            <Typography variant="body2" mt={1}>
                                <strong>Details:</strong> {selectedInverter.details}
                            </Typography>
                        </>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
}
