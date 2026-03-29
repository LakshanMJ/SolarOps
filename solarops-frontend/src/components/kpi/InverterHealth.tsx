import { useEffect, useState } from 'react';
import { Box, Typography, } from '@mui/material';
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import InverterDrawer from './InverterDrawer';
import SolarChip from '@/utils/SolarStatusChip';
import SolarDataGrid from '@/utils/SolarDataGrid';
import { fetchData } from '@/utils/fetch';
import { BACKEND_URLS } from '@/backendUrls';
import StatusChip from '@/utils/SolarStatusChip';

const inverterStatusConfig = {
    online: { sx: { backgroundColor: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' } },
    degraded: { sx: { backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } },
    critical: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
    offline: { sx: { backgroundColor: 'rgba(107,114,128,0.2)', color: '#9ca3af', border: '1px solid rgba(107,114,128,0.3)' } },
};

export default function InverterHealthTable() {
    const [selectedInverter, setSelectedInverter] = useState<any>(null);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [inverterData, setInverterData] = useState([]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Inverter ID', flex: 1.2 },
        { field: 'siteName', headerName: 'Site', align: 'center', headerAlign: 'center', flex: 1.2 },
        {
            field: 'status',
            headerName: 'Status',
            align: 'center',
            headerAlign: 'center',
            flex: 0.9,
            renderCell: (params) => (
                <StatusChip status={params.value} config={inverterStatusConfig} />
            )
        },
        { field: 'capacityKw', headerName: 'Capacity (kW)', align: 'center', flex: 1.2 },
        { field: 'tempC', headerName: 'Temp (°C)', type: 'number', align: 'center', headerAlign: 'center', flex: 0.8 },
        { field: 'capacityUtilization', headerName: 'Capacity Utilization (%)', type: 'number', sortable: true, align: 'center', headerAlign: 'center', flex: 0.8 },
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

    useEffect(() => {
        async function fetchInverters() {
            try {
                const inverterData = await fetchData(BACKEND_URLS.INVERTERS)
                setInverterData(inverterData)
            } catch (err) {
                console.error('Failed to load inverter data:', err)
            }
        }
        fetchInverters()
        const interval = setInterval(fetchInverters, 15000)

        return () => clearInterval(interval)
    }, [])

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
