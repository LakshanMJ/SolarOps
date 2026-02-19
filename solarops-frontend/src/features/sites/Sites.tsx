import { Box } from "@mui/material";
import SitesMap from "./SitesMap";
import { type GridColDef } from "@mui/x-data-grid";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";

// const sitesData = [
//     { id: 1, name: 'Site A', location: 'Colombo', capacity: 5, activeInverters: 12, alerts: 2, avgPR: 88 },
//     { id: 2, name: 'Site B', location: 'Kandy', capacity: 3, activeInverters: 8, alerts: 0, avgPR: 92 },
//     { id: 3, name: 'Site C', location: 'Galle', capacity: 4, activeInverters: 10, alerts: 1, avgPR: 85 },
// ];


const Sites = () => {

    const [sites, setSites] = useState<Site[]>([]);
    console.log(sites,'sites')
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Site Name', flex: 2.5, minWidth: 200, align: 'center', headerAlign: 'center' },
        { field: 'location', headerName: 'Location', flex: 3, minWidth: 220, align: 'center', headerAlign: 'center' },
        { field: 'capacity', headerName: 'Capacity (MW)', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'activeInverters', headerName: 'Active Inverters', type: 'number', flex: 1, minWidth: 140, align: 'center', headerAlign: 'center' },
        { field: 'alerts', headerName: 'Alerts Count', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'avgPR', headerName: 'Avg PR (%)', type: 'number', sortable: true, flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
    ];

    useEffect(() => {
        async function fetchSites() {
            try {
                const siteData = await fetchData(BACKEND_URLS.SITES);
                setSites(siteData);
            } catch (err) {
                console.error('Failed to load site data:', err);
            }
        }

        fetchSites();
    }, []); // empty dependency array = run only on mount

    return (
        <>
            <SitesMap />
            <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                <SolarDataGrid
                    rows={sites}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    disableColumnSorting
                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                    autoHeight
                />
            </Box>
        </>
    );
}

export default Sites;