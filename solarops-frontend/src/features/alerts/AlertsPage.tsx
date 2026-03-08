import { Box, Typography, Chip } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import SolarDataGrid from '@/utils/SolarDataGrid';
import { useEffect, useState } from 'react';
import { BACKEND_URLS } from '@/backendUrls';
import { fetchData } from '@/utils/fetch';

interface AlertRow {
  id: string;
  severity: 'Warning' | 'Critical' | 'Info';
  message: string;
  inverter?: {
    name: string;
    site?: { name: string };
  };
  createdAt: string;
  status: 'Open' | 'Closed';
  maintenanceAction?: string;
}

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
      width: 130,
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
      flex: 2,
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
      valueGetter: (value, row: AlertRow) => row?.createdAt || '',
      valueFormatter: (value: string) => {
        if (!value) return '';
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        };
        return date.toLocaleString(undefined, options);
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
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
          getRowId={(row) => row.id}
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
