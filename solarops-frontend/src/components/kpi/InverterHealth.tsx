import { useState } from 'react';
import { Box, Typography, } from '@mui/material';
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import InverterDrawer from './InverterDrawer';
import SolarChip from '@/utils/SolarStatusChip';
import SolarDataGrid from '@/utils/SolarDataGrid';

const inverterData = [
    {
        id: 1,
        inverterId: 'INV-101',
        site: 'Site A',
        status: 'Online',
        currentOutput: 120,
        temp: 45,
        pr: 88,
        details: 'Inverter operating normally',
    },
    {
        id: 2,
        inverterId: 'INV-102',
        site: 'Site B',
        status: 'Degraded',
        currentOutput: 95,
        temp: 50,
        pr: 82,
        details: 'Slight underperformance',
    },
    {
        id: 3,
        inverterId: 'INV-103',
        site: 'Site C',
        status: 'Critical',
        currentOutput: 40,
        temp: 70,
        pr: 60,
        details: 'Inverter faulty',
    },
    {
        id: 4,
        inverterId: 'INV-108',
        site: 'Site X',
        status: 'Offline',
        currentOutput: 70,
        temp: 90,
        pr: 25,
        details: 'Inverter offline',
    },
];

export default function InverterHealthTable() {
    const [selectedInverter, setSelectedInverter] = useState<any>(null);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

    const columns: GridColDef[] = [
        { field: 'inverterId', headerName: 'Inverter ID', flex: 1.2 },
        { field: 'site', headerName: 'Site', align: 'center', headerAlign: 'center', flex: 1.2 },
        {
            field: 'status',
            headerName: 'Status',
            align: 'center',
            headerAlign: 'center',
            flex: 0.9,
            renderCell: (params: GridRenderCellParams) => (
                <SolarChip status={params?.value} />
            ),
        },
        {
            field: 'currentOutput',
            headerName: 'Current Output (kW)',
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            flex: 1.4,
        },
        { field: 'temp', headerName: 'Temp (°C)', type: 'number', align: 'center', headerAlign: 'center', flex: 0.8 },
        { field: 'pr', headerName: 'PR (%)', type: 'number', sortable: true, align: 'center', headerAlign: 'center', flex: 0.8 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.9,
            renderCell: (params) => (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setSelectedInverter(params.row);
                        setSelectedRowIds([params.id as number]);
                    }}
                >
                    <Typography variant="body2" color="primary">
                        View
                    </Typography>
                </Box>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography
                variant="subtitle1"
                mb={1}
                sx={{ color: 'var(--text-primary)', fontWeight: 600 }}
                gutterBottom
            >
                Inverter Health
            </Typography>

            <SolarDataGrid
                rows={inverterData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                disableColumnSorting
                selectionModel={selectedRowIds}
                onSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}
            />

            <InverterDrawer
                open={!!selectedInverter}
                onClose={() => setSelectedInverter(null)}
                inverter={selectedInverter}
            />
        </Box>
    );
}
