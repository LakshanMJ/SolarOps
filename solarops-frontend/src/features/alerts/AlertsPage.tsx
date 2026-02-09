import { Box, Typography, Chip } from '@mui/material';
import {type GridColDef } from '@mui/x-data-grid';
import SolarDataGrid from '@/utils/SolarDataGrid';

// Sample alerts
const alertsData = [
  {
    id: 1,
    severity: 'critical',
    message: 'Inverter offline',
    inverter: 'INV-101',
    site: 'Site A',
    createdAt: '2026-01-22 08:12',
    resolvedAt: null,
    status: 'Active',
    maintenanceAction: 'Dispatch technician',
  },
  {
    id: 2,
    severity: 'warning',
    message: 'PR drop detected',
    inverter: 'INV-102',
    site: 'Site B',
    createdAt: '2026-01-21 14:35',
    resolvedAt: '2026-01-21 16:00',
    status: 'Resolved',
    maintenanceAction: 'Reset inverter',
  },
  {
    id: 3,
    severity: 'info',
    message: 'Temperature high',
    inverter: 'INV-103',
    site: 'Site C',
    createdAt: '2026-01-20 12:20',
    resolvedAt: null,
    status: 'Active',
    maintenanceAction: 'Monitor',
  },
];

// Colors
const severityColor = {
  critical: 'error',
  warning: 'warning',
  info: 'success',
};

const statusColor = {
  Active: 'error',
  Resolved: 'success',
};

export default function AlertsPage() {
  const columns: GridColDef[] = [
    {
      field: 'severity',
      headerName: 'Severity',
      width: 120,
      align: 'left', 
      headerAlign: 'left',
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={severityColor[params.value as keyof typeof severityColor]}
          size="small"
        />
      ),
    },
    { field: 'message', headerName: 'Message', width: 200, align: 'left', headerAlign: 'left', flex: 1 },
    { field: 'inverter', headerName: 'Inverter', width: 120, align: 'left', headerAlign: 'left' },
    { field: 'site', headerName: 'Site', width: 120, align: 'left', headerAlign: 'left' },
    { field: 'createdAt', headerName: 'Created At', width: 150, align: 'left', headerAlign: 'left' },
    // { field: 'resolvedAt', headerName: 'Resolved At', width: 150, valueGetter: (params) => params?.row?.resolvedAt ?? '-' },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as keyof typeof statusColor]}
          size="small"
        />
      ),
    },
    { field: 'maintenanceAction', headerName: 'Maintenance Actions', width: 180, headerAlign: 'left', flex: 1 },
  ];

  return (
    <Box sx={{ height: 600, width: '100%',  color: '#fff' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
        Alerts Audit & Accountability
      </Typography>

      <Box sx={{ height: 400, width: '100%', mt: 2 }}>
        <SolarDataGrid
          rows={alertsData}
          columns={columns}
          pageSizeOptions={[5, 10]}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnSorting
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          autoHeight
        />
      </Box>
    </Box>
  );
}
