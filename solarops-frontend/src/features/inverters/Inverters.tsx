import SolarDataGrid from "@/utils/SolarDataGrid";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SolarChip from "@/utils/SolarStatusChip";
import InverterDrawer from "@/components/kpi/InverterDrawer";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateUpdateInverter from "./CreateUpdateInverter";
import DeleteModal from "@/utils/deleteModal";
import StatusChip from "@/utils/SolarStatusChip";
import Dashtwo from "@/components/dashtwo/Dashtwo";
import { useNavigate } from "react-router-dom";
// import { GridValueFormatterParams } from '@mui/x-data-grid';
// import InvtDrwer from "@/components/kpi/invtDrwer";

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

const inverterStatusConfig = {
  online: { sx: { backgroundColor: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' } },
  degraded: { sx: { backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' } },
  critical: { sx: { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' } },
  offline: { sx: { backgroundColor: 'rgba(107,114,128,0.2)', color: '#9ca3af', border: '1px solid rgba(107,114,128,0.3)' } },
};

const Inverters = () => {

   const navigate = useNavigate();
   const [selectedInverter, setSelectedInverter] = useState<any>(null);
   const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
   const [inverterData, setInverterData] = useState<Inverter[]>([]);
   const [activeInverterId, setActiveInverterId] = useState<string | null>(null);
   const [inverterDeleteModal, setInverterDeleteModal] = useState({
      show: false,
      id: null as string | null,
   });
   const [dashtwoOpen, setDashtwoOpen] = useState(false);

   const columns = useMemo<GridColDef[]>(() => [
      { field: 'name', headerName: 'Inverter ID', flex: 1 },

      { field: 'capacityKw', headerName: 'Capacity (kW)', align: 'center', headerAlign: 'center', flex: 1 },

      { field: 'siteName', headerName: 'Site', align: 'center', headerAlign: 'center', flex: 1.3 },

      {
         field: 'status',
         headerName: 'Status',
         align: 'center',
         headerAlign: 'center',
         flex: 0.8,
         renderCell: (params) => (
            <StatusChip status={params.value} config={inverterStatusConfig} />
         )
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

      { field: 'capacityUtilization', headerName: 'Capacity Utilization (%)', type: 'number', sortable: true, align: 'center', headerAlign: 'center', flex: 0.9 },

      { field: 'alerts', headerName: 'Alerts', align: 'center', headerAlign: 'center', flex: 0.8 },

      {
         field: 'lastUpdate',
         headerName: 'Last Update',
         align: 'center',
         headerAlign: 'center',
         flex: 1.3,
         valueFormatter: (value) => {
            if (!value) return '';

            const date = new Date(value as string);

            return date.toLocaleString('en-GB', {
               day: '2-digit',
               month: 'short',
               year: 'numeric',
               hour: '2-digit',
               minute: '2-digit',
            });
         }
      },

      {
         field: 'actions',
         headerName: 'Actions',
         headerAlign: 'center',
         flex: 1,
         renderCell: (params) => (
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
               }}
            >
               <IconButton
                  size="small"
                  onClick={() => {
                     setSelectedInverter(params.row);
                     setSelectedRowIds([params.id as number]);
                  }}
               >
                  <VisibilityIcon sx={{ color: 'white' }} fontSize="small" />
               </IconButton>

               <IconButton
                  size="small"
                  onClick={() => {
                     setActiveInverterId(params.row.id);
                  }}
               >
                  <EditIcon sx={{ color: 'white' }} fontSize="small" />
               </IconButton>

               <IconButton
                  size="small"
                  onClick={() =>
                     setInverterDeleteModal({
                        show: true,
                        id: params.row.id,
                     })
                  }
               >
                  <DeleteIcon sx={{ color: 'white' }} fontSize="small" />
               </IconButton>
            </Box>
         ),
         sortable: false,
         filterable: false,
      }
   ], []);

   const fetchInverters = async () => {
      try {
         const inverterData = await fetchData(BACKEND_URLS.INVERTERS);
         setInverterData(inverterData);
      } catch (err) {
         console.error('Failed to load inverter data:', err);
      }
   };

   const handleDeleteInverter = async () => {
      if (!inverterDeleteModal.id) return;

      try {
         await fetchData(
            `${BACKEND_URLS.INVERTERS}/${inverterDeleteModal.id}`,
            { method: "DELETE" }
         );

         await fetchInverters(); // refresh list
      } catch (err) {
         console.error("Delete failed:", err);
      }
   };

   useEffect(() => {
      fetchInverters();
   }, []);

   return (
      <>
      {dashtwoOpen && (
         <Box
            sx={{
               position: 'fixed',
               inset: 0,
               zIndex: (t) => t.zIndex.modal + 2,
               overflow: 'auto',
            }}
         >
            <Dashtwo onClose={() => setDashtwoOpen(false)} />
         </Box>
      )}
      <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
         <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
            Inverters
         </Typography>

         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, flexWrap: 'wrap', mt: 2 }}>
            {/* <Button
               variant="outlined"
               onClick={() => navigate('/apexlogix')}
               sx={{
                  borderColor: 'rgba(0,163,255,0.7)',
                  color: '#00A3FF',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '12px',
                  px: 2,
                  '&:hover': {
                     borderColor: '#00A3FF',
                     bgcolor: 'rgba(0,163,255,0.08)',
                  },
               }}
            >
               Landing Page
            </Button> */}
            {/* <Button
               variant="outlined"
               onClick={() => setDashtwoOpen(true)}
               sx={{
                  borderColor: '#5D46B6',
                  color: '#5D46B6',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '12px',
                  px: 2,
                  '&:hover': {
                     borderColor: '#4a3899',
                     bgcolor: 'rgba(93, 70, 182, 0.06)',
                  },
               }}
            >
               ForShop dashboard
            </Button> */}
            <Button
               variant="contained"
               color="primary"
               onClick={() => setActiveInverterId('new')}
            >
               Add Inverter
            </Button>
         </Box>

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
         {activeInverterId && (
            <CreateUpdateInverter
               open={activeInverterId !== null}
               inverterId={activeInverterId}
               onClose={() => setActiveInverterId(null)}
               fetchInverters={fetchInverters}
            />
         )}
         <DeleteModal
            open={inverterDeleteModal.show}
            onClose={() =>
               setInverterDeleteModal({
                  ...inverterDeleteModal,
                  show: false,
               })
            }
            onConfirm={handleDeleteInverter}
         />
      </Box>
      </>
   );
}

export default Inverters;