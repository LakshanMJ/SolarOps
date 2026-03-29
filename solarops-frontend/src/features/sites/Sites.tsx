import { Box, Button, IconButton, Typography } from "@mui/material";
import SitesMap from "./SitesMap";
import { type GridColDef } from "@mui/x-data-grid";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from "@/utils/deleteModal";
import CreateUpdateSites from "./CreateUpdateSites";

const Sites = () => {

    const [sites, setSites] = useState<Site[]>([]);
    const [siteDeleteModal, setSiteDeleteModal] = useState({
        show: false,
        id: null as string | null,
    });
    const [activeSiteId, setActiveSiteId] = useState<string | null>(null);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Site Name', flex: 2.5, minWidth: 200, align: 'left', headerAlign: 'left' },
        { field: 'location', headerName: 'Location', flex: 3, minWidth: 220, align: 'center', headerAlign: 'center' },
        { field: 'capacity', headerName: 'Capacity (MW)', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'activeInverters', headerName: 'Active Inverters', type: 'number', flex: 1, minWidth: 140, align: 'center', headerAlign: 'center' },
        { field: 'alerts', headerName: 'Alerts Count', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'avgInverterPowerKw', headerName: 'Avg Inverter Power (kW)', type: 'number', sortable: true, flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            flex: 1,
            minWidth: 140,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box>
                    <IconButton
                        onClick={() => setActiveSiteId(params.row.id)}
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => setSiteDeleteModal({ show: true, id: params.row.id })}
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const fetchSites = async () => {
        try {
            const siteData = await fetchData(BACKEND_URLS.SITES);
            setSites(siteData);
        } catch (err) {
            console.error("Failed to load site data:", err);
        }
    };

    const handleDeleteSites = async () => {
        if (!siteDeleteModal.id) return;
        try {
            await fetchData(
                `${BACKEND_URLS.SITES}/${siteDeleteModal.id}`,
                { method: "DELETE" }
            );
            await fetchSites();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    useEffect(() => {
        fetchSites();
    }, []);

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                Sites
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => setActiveSiteId('new')}
                >
                    Add Site
                </Button>
            </Box>
            <SitesMap sites={sites} />
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
            {activeSiteId && (
                <CreateUpdateSites
                    open={activeSiteId !== null}
                    siteId={activeSiteId}
                    onClose={() => setActiveSiteId(null)}
                    fetchSites={fetchSites}
                />
            )}
            <DeleteModal
                open={siteDeleteModal.show}
                onClose={() =>
                    setSiteDeleteModal({
                        ...siteDeleteModal,
                        show: false,
                    })
                }
                onConfirm={handleDeleteSites}
            />
        </>
    );
}

export default Sites;