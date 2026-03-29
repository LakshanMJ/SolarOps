import { Box, Typography, Chip } from '@mui/material';
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SolarDataGrid from '@/utils/SolarDataGrid';
import { useEffect, useState } from 'react';
import { BACKEND_URLS } from '@/backendUrls';
import { fetchData } from '@/utils/fetch';
import SolarChip from '@/utils/SolarStatusChip';
import StatusChip from '@/utils/SolarStatusChip';

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

const alertSeverityStatusConfig = {
   warning: { sx: { backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } },
   critical: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
};

const alertStatusConfig = {
   resolved: { sx: { backgroundColor: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' } },
   open: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
};

export default function AlertsPage() {

   const [alertsData, setAlertsData] = useState([])

   const columns: GridColDef<AlertRow>[] = [
      {
         field: 'severity',
         headerName: 'Severity',
         width: 130,
         align: 'left',
         headerAlign: 'left',
         renderCell: (params) => (
            <StatusChip status={params.value} config={alertSeverityStatusConfig} />
         )
      },
      {
         field: 'message',
         headerName: 'Message',
         flex: 2,
         minWidth: 200,
         align: 'left',
         headerAlign: 'center',
      },
      {
         field: 'inverter',
         headerName: 'Inverter',
         flex: 1.2,
         minWidth: 120,
         align: 'center',
         headerAlign: 'center',
         valueGetter: (_, row) => row.inverter?.name,
      },
      {
         field: 'site',
         headerName: 'Site',
         flex: 1.5,
         minWidth: 140,
         align: 'left',
         headerAlign: 'center',
         valueGetter: (_, row) => row.inverter?.site?.name,
      },
      {
         field: 'createdAt',
         headerName: 'Created At',
         flex: 1.2,
         minWidth: 150,
         align: 'left',
         headerAlign: 'center',
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
         align: 'center',
         headerAlign: 'center',
         renderCell: (params) => (
            <StatusChip status={params.value} config={alertStatusConfig} />
         )
      },
      {
         field: 'maintenanceAction',
         headerName: 'Maintenance Actions',
         flex: 1.5,
         minWidth: 180,
         headerAlign: 'center',
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
