import SolarDataGrid from "@/utils/SolarDataGrid";
import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import type { ColumnDef } from '@tanstack/react-table'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SolarChip from "@/utils/SolarStatusChip";
import InverterDrawer from "@/components/kpi/InverterDrawer";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";

const inverterData = [
  {
    id: 1,
    inverterId: 'INV-101',
    site: 'Site A',
    status: 'Online',
    currentOutput: 120,
    temp: 45,
    pr: 88,
    alerts: 0,
    lastUpdate: '2026-01-22 08:12',
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
    alerts: 2,
    lastUpdate: '2026-01-21 14:35',
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
    alerts: 5,
    lastUpdate: '2026-01-20 12:20',
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
    alerts: 3,
    lastUpdate: '2026-01-19 10:00',
    details: 'Inverter offline',
  },
]

export type Inverter = {
  id: string
  site: string
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL'
  outputKw: number
  temperature: number
  pr: number
  lastUpdate: string
  activeAlerts: number
}

const Inverters = () => {

  const [selectedInverter, setSelectedInverter] = useState<any>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const [inverterData, setInverterData] = useState<Inverter[]>([]);
  console.log(inverterData, 'inverterData')

  const columns = useMemo<GridColDef[]>(() => [
    { field: 'name', headerName: 'Inverter ID', flex: 1 },

    { field: 'capacityKw', headerName: 'Capacity (kW)', align: 'center', headerAlign: 'center', flex: 1 },

    { field: 'site', headerName: 'Site', align: 'center', headerAlign: 'center', flex: 1.3 },

    {
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      flex: 0.8,
      renderCell: (params: GridRenderCellParams) => (
        <SolarChip status={params?.value} />
      ),
    },

    {
      field: 'outputKw',
      headerName: 'Current Output (kW)',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      flex: 0.9,
    },

    { field: 'tempC', headerName: 'Temp (°C)', type: 'number', align: 'center', headerAlign: 'center', flex: 0.9 },

    { field: 'pr', headerName: 'PR (%)', type: 'number', sortable: true, align: 'center', headerAlign: 'center', flex: 0.9 },

    { field: 'alerts', headerName: 'Alerts', align: 'center', headerAlign: 'center', flex: 0.8 },

    { field: 'lastUpdate', headerName: 'Last Update', align: 'center', headerAlign: 'center', flex: 1.3 },

    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      flex: 0.7,
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
    }
  ], []);

  useEffect(() => {
    async function fetchInverters() {
      try {
        const inverterData = await fetchData(BACKEND_URLS.INVERTERS);
        setInverterData(inverterData);
      } catch (err) {
        console.error('Failed to load inverter data:', err);
      }
    }

    fetchInverters();
  }, []);

  return (

    <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
        Inverters
      </Typography>

      <Box sx={{ height: 400, width: '100%', mt: 2 }}>
        <SolarDataGrid
          rows={inverterData}
          columns={columns}
          pageSizeOptions={[5, 10]}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnSorting
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          selectionModel={selectedRowIds}
          onSelectionModelChange={(newSelection) => setSelectedRowIds(newSelection)}
          autoHeight
        />
      </Box>
      <InverterDrawer
        open={!!selectedInverter}
        onClose={() => setSelectedInverter(null)}
        inverter={selectedInverter}
      />
    </Box>
  );
}

export default Inverters;