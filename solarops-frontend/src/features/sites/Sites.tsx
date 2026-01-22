import { Box } from "@mui/material";
import SitesMap from "./SitesMap";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

// Sample sites data
const sitesData = [
  { id: 1, name: 'Site A', location: 'Colombo', capacity: 5, activeInverters: 12, alerts: 2, avgPR: 88 },
  { id: 2, name: 'Site B', location: 'Kandy', capacity: 3, activeInverters: 8, alerts: 0, avgPR: 92 },
  { id: 3, name: 'Site C', location: 'Galle', capacity: 4, activeInverters: 10, alerts: 1, avgPR: 85 },
];


const Sites = () => {

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Site Name', width: 150 },
        { field: 'location', headerName: 'Location', width: 120 },
        { field: 'capacity', headerName: 'Capacity (MW)', width: 120, type: 'number' },
        { field: 'activeInverters', headerName: 'Active Inverters', width: 140, type: 'number' },
        { field: 'alerts', headerName: 'Alerts Count', width: 120, type: 'number' },
        { field: 'avgPR', headerName: 'Avg PR (%)', width: 120, type: 'number', sortable: true },
    ];

    return (
        <>
            <SitesMap />
            <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                <DataGrid
                    rows={sitesData}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                    autoHeight
                    sx={{
                        backgroundColor: '#1e1e1e',
                        color: '#fff',
                        border: 'none',
                        '.MuiDataGrid-cell': { borderBottom: '1px solid #2c2c2c' },
                        '.MuiDataGrid-columnHeaders': { backgroundColor: '#1b1b1b', color: '#fff' },
                        '.MuiDataGrid-footerContainer': { backgroundColor: '#1b1b1b', color: '#fff' },
                        '.MuiDataGrid-row:hover': { backgroundColor: '#2a2a2a' },
                    }}
                />
            </Box>
        </>
    );
}

export default Sites;