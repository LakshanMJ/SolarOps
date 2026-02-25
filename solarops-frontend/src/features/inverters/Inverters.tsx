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
  // const [openAddInverterModal, setOpenAddInverterModal] = useState(false);
  // const [loading, setLoading] = useState(false)
  const [activeInverterId, setActiveInverterId] = useState<string | null>(null);


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
            onClick={() => {
              setSelectedInverter(params.row);
            }}
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

  useEffect(() => {
    fetchInverters();
  }, []);

  return (

    <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
        Inverters
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
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
    </Box>
  );
}

export default Inverters;