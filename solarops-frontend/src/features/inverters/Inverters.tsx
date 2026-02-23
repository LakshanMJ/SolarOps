import SolarDataGrid from "@/utils/SolarDataGrid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import SolarChip from "@/utils/SolarStatusChip";
import InverterDrawer from "@/components/kpi/InverterDrawer";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";

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
  const [openAddInverterModal, setOpenAddInverterModal] = useState(false);
  const [sites, setSites] = useState<any[]>([]);
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  console.log(manufacturers, 'manufacturers')
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    serial_number: "",
    capacity: "",
    site_id: ""
  });
  console.log(form, 'form')

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

  const fetchManufacturer = async () => {
    try {
      const manufacturerData = await fetchData(BACKEND_URLS.MANUFACTURERS);
      setManufacturers(manufacturerData);
    } catch (err) {
      console.error("Failed to load manufacturer data:", err);
    }
  };

  const fetchSites = async () => {
    try {
      const siteData = await fetchData(BACKEND_URLS.SITES);
      setSites(siteData);
    } catch (err) {
      console.error("Failed to load site data:", err);
    }
  };

  const saveInverter = async () => {
    setLoading(true)

    try {
      // Replace these values with your form state
      // const payload = {
      //   name: "INV-01",
      //   siteId: site_id,
      //   manufacturerId: manufacturerId, // optional
      //   capacityKw: 50,
      //   status: "ACTIVE", // must match your enum exactly
      //   installedAt: new Date().toISOString()
      // }

      const res = await fetch(BACKEND_URLS.INVERTERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        throw new Error('Failed to save inverter')
      }

      const data = await res.json()
      console.log('Inverter saved:', data)
      alert('Inverter saved successfully!') // browser alert okay here

    } catch (error: unknown) {
      console.error(error)
      alert('Error saving inverter: ' + (error as any).message)
    } finally {
      setLoading(false)
    }
  }

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
    fetchSites();
    fetchManufacturer();
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
          onClick={() => setOpenAddInverterModal(true)}
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
      <Dialog
        open={openAddInverterModal}
        onClose={() => setOpenAddInverterModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Inverter</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1
            }}
          >
            <TextField
              label="Inverter Name"
              fullWidth
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              } />
            <TextField
              select
              label="Manufacturer"
              value={form.manufacturer}
              onChange={(e) =>
                setForm({ ...form, manufacturer: e.target.value })
              }
              fullWidth
            >
              {manufacturers.map((manufacturer) => (
                <MenuItem key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Serial Number"
              fullWidth
              onChange={(e) =>
                setForm({ ...form, serial_number: e.target.value })
              } />
            <TextField
              label="Capacity (kW)"
              type="number"
              fullWidth
              onChange={(e) =>
                setForm({ ...form, capacity: e.target.value })
              } />
            <TextField
              select
              label="Site"
              value={form.site_id}
              onChange={(e) =>
                setForm({ ...form, site_id: e.target.value })
              }
              fullWidth
            >
              {sites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddInverterModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => saveInverter()}>
            Save Inverter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Inverters;