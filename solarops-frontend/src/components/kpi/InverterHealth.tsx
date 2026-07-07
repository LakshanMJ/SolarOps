import { useEffect, useState } from 'react';
import { Box, Typography, } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import InverterDrawer from './InverterDrawer';
import SolarDataGrid from '@/utils/SolarDataGrid';
import { fetchData } from '@/utils/Fetch';
import { BACKEND_URLS } from '@/backendUrls';
import StatusChip from '@/utils/SolarStatusChip';
import type { GridRowSelectionModel } from "@mui/x-data-grid";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Status = 'Online' | 'Degraded' | 'Critical' | 'Offline';

// interface Inverter {
//     id: number;
//     name: string;

//     status: Status;

//     siteId: string;
//     siteName: string;

//     manufacturerId: string;
//     manufacturerName: string;

//     serialNumber: string;
//     model: string;
//     firmwareVersion: string;

//     capacityKw: number | null;
//     capacityUtilization: number | null;

//     currentOutput: number | null;
//     temp: number | null;

//     installedAt: string;

//     image: File | string | null;
// }

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
    capacityUtilization: string;
    image: File | string | null;
    tempC: number;
    outputKw: number;
}


const inverterStatusConfig = {
    online: { sx: { backgroundColor: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' } },
    degraded: { sx: { backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } },
    critical: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
    offline: { sx: { backgroundColor: 'rgba(107,114,128,0.2)', color: '#9ca3af', border: '1px solid rgba(107,114,128,0.3)' } },
};

export default function InverterHealthTable() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [selectedInverter, setSelectedInverter] = useState<Inverter | null>(null);
    // const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set(),
    });
    const [inverterData, setInverterData] = useState<Inverter[]>([]);
    const [loading, setLoading] = useState(true);

    const baseColumns: GridColDef<Inverter>[] = [
        {
            field: "name",
            headerName: "Inverter ID",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "siteName",
            headerName: "Site",
            flex: 1.2,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "status",
            headerName: "Status",
            flex: 0.8,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <StatusChip
                    status={params.value}
                    config={inverterStatusConfig}
                />
            ),
        },

        {
            field: "capacityKw",
            headerName: "Capacity (kW)",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "tempC",
            headerName: "Temp (°C)",
            flex: 0.8,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "capacityUtilization",
            headerName: "Capacity Utilization (%)",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.8,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setSelectedInverter(params.row);
                        setSelectedRowIds({
                            type: "include",
                            ids: new Set([params.id as number]),
                        });
                    }}
                >
                    <Typography variant="body2" color="primary">
                        View
                    </Typography>
                </Box>
            ),
        },
    ];

    const mobileColumns: GridColDef<Inverter>[] = baseColumns.filter((col) =>
        ["name", "status"].includes(col.field)
    );

    useEffect(() => {
        async function fetchInverters() {
            setLoading(true)
            try {
                const inverterData = await fetchData<Inverter[]>(BACKEND_URLS.INVERTERS)
                setInverterData(inverterData)
            } catch (err) {
                console.error('Failed to load inverter data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchInverters()
        const interval = setInterval(fetchInverters, 15000)

        return () => clearInterval(interval)
    }, [])

    return (
        // <Box sx={{ height: 400, width: '100%' }}>
        <Box sx={{ width: "100%" }}>
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
                columns={isMobile ? mobileColumns : baseColumns}
                loading={loading}
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 7 },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                disableColumnSorting
                rowSelectionModel={selectedRowIds}
                onRowSelectionModelChange={setSelectedRowIds}
            />

            <InverterDrawer
                open={!!selectedInverter}
                onClose={() => setSelectedInverter(null)}
                inverter={selectedInverter}
            />
        </Box>
    );
}
