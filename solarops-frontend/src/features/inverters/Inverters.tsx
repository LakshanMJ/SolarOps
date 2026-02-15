import SolarDataGrid from "@/utils/SolarDataGrid";
import { Box, Chip, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import type { ColumnDef } from '@tanstack/react-table'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SolarChip from "@/utils/SolarStatusChip";
import InverterDrawer from "@/components/kpi/InverterDrawer";

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
  
  // const columns2 = useMemo<ColumnDef<Inverter>[]>(() => [
  //   { field: 'inverterId', headerName: 'Inverter ID', flex: 1.2 },
  //   { header: 'Site', accessorKey: 'site' },
  //   {
  //     header: 'Status',
  //     accessorKey: 'status',
  //     cell: info => {
  //       const v = info.getValue<string>()
  //       const color =
  //         v === 'HEALTHY' ? 'success' : v === 'WARNING' ? 'warning' : 'error'
  //       return <Chip size="small" color={color} label={v} />
  //     },
  //   },
  //   { header: 'Output (kW)', accessorKey: 'outputKw', cell: info => info.getValue<number>().toFixed(0) },
  //   { header: 'Temp (°C)', accessorKey: 'temperature', cell: info => info.getValue<number>().toFixed(1) },
  //   { header: 'PR (%)', accessorKey: 'pr', cell: info => `${info.getValue<number>().toFixed(1)}%` },
  //   {
  //     header: 'Alerts',
  //     accessorKey: 'activeAlerts',
  //     cell: info => (
  //       <Typography color={info.getValue<number>() > 0 ? 'error' : 'text.secondary'}>
  //         {info.getValue<number>()}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     header: 'Last Update',
  //     accessorKey: 'lastUpdate',
  //     cell: info => <Typography color="text.secondary">{info.getValue<string>()}</Typography>,
  //   },
  // ], [])

  const columns = useMemo<GridColDef<Inverter>[]>(() => [
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
    { field: 'alerts', headerName: 'Alerts', align: 'center', headerAlign: 'center', flex: 0.8 },
    { field: 'lastUpdate', headerName: 'Last Update', align: 'center', headerAlign: 'center', flex: 1.2 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
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
    }
  ], [])

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