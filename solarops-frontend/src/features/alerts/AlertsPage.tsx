import { Box, Typography, Chip } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import SolarDataGrid from '@/utils/SolarDataGrid';
import { useEffect, useState } from 'react';
import { BACKEND_URLS } from '@/backendUrls';
import { fetchData } from '@/utils/fetch';

type AlertRow = {
  id: string;
  message: string;
  createdAt: string;
  inverter: {
    name: string;
    site: {
      name: string;
    };
  };
};


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
  Critical: 'error',
  Warning: 'warning',
  Info: 'success',
};

const statusColor = {
  Open: 'error',
  Resolved: 'success',
};

export default function AlertsPage() {

  const [alertsData, setAlertsData] = useState([])
  console.log(alertsData, 'alertsData')

  const columns: GridColDef<AlertRow>[] = [
    {
      field: 'severity',
      headerName: 'Severity',
      width: 130, // slightly wider for Chip
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
    {
      field: 'message',
      headerName: 'Message',
      flex: 2, // take more space for long messages
      minWidth: 200,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'inverter',
      headerName: 'Inverter',
      flex: 1.2,
      minWidth: 120,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (_, row) => row.inverter?.name,
    },
    {
      field: 'site',
      headerName: 'Site',
      flex: 1.5,
      minWidth: 140,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (_, row) => row.inverter?.site?.name,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1.2,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130, // fixed width works well for Chips
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
    {
      field: 'maintenanceAction',
      headerName: 'Maintenance Actions',
      flex: 1.5,
      minWidth: 180,
      headerAlign: 'left',
    },
  ];

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const alertsData = await fetchData(BACKEND_URLS.ALERTS);
        setAlertsData(alertsData);
      } catch (err) {
        console.error('Failed to load alerts data:', err);
      }
    }

    fetchAlerts();
  }, []);

  return (
    <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
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
