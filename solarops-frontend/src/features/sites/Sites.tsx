import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import SitesMap from "./SitesMap";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/Fetch";
import { BACKEND_URLS } from "@/backendUrls";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SiteDetailsDrawer from "@/components/kpi/SiteDetailsDrawer";
import DeleteModal from "@/utils/deleteModal";
import CreateUpdateSites from "./CreateUpdateSites";

// type Props = {
//     sites: any[];
// };

export interface Site {
    location: any;
    id: string;
    name: string;
    region: string;
    peakCapacityMw: number;
    lat: number;
    lng: number;
    activeInverters: number;
    alerts: number;
    avgInverterPowerMw: number;
    health: "Good" | "Warning" | "Critical" | "Unknown";
}

const Sites = () => {

    const [loading, setLoading] = useState(true);
    const [sites, setSites] = useState<Site[]>([]);
    console.log(sites,'all sites')
    const [siteDeleteModal, setSiteDeleteModal] = useState({
        show: false,
        id: null as string | null,
    });
    const [activeSiteId, setActiveSiteId] = useState<string | null>(null);
    const [selectedSite, setSelectedSite] = useState<any>(null);

    const columns: GridColDef<any>[] = [
        { field: 'name', headerName: 'Site Name', flex: 2.5, minWidth: 200, align: 'left', headerAlign: 'left' },
        { field: 'location', headerName: 'Location', flex: 3, minWidth: 220, align: 'center', headerAlign: 'center' },
        { field: 'capacity', headerName: 'Capacity (MW)', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'activeInverters', headerName: 'Active Inverters', type: 'number', flex: 1, minWidth: 140, align: 'center', headerAlign: 'center' },
        { field: 'alerts', headerName: 'Alerts Count', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'avgInverterPowerMW', headerName: 'Avg Inverter Power (MW)', type: 'number', sortable: true, flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            flex: 1,
            minWidth: 140,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<any>) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <IconButton
                        onClick={() => setSelectedSite(params.row)}
                        size="small"
                        aria-label="View site details"
                    >
                        <VisibilityIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                    <IconButton
                        onClick={() => setActiveSiteId(params.row.id)}
                        size="small"
                        aria-label="Edit site"
                    >
                        <EditIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>

                    <IconButton
                        onClick={() => setSiteDeleteModal({ show: true, id: params.row.id })}
                        size="small"
                        aria-label="Delete site"
                    >
                        <DeleteIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const fetchSites = async (): Promise<void> => {
        setLoading(true);

        try {
            const siteData = await fetchData<Site[]>(BACKEND_URLS.SITES);
            console.log(siteData);
            setSites(siteData);
        } catch (err) {
            console.error("Failed to load site data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSites = async (): Promise<void> => {
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

    // if (loading) {
    //     return <CircularProgress />;
    // }

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

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
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    disableColumnSorting
                    columnHeaderHeight={80}
                    autoHeight
                />
            </Box>
            <SiteDetailsDrawer
                open={!!selectedSite}
                site={selectedSite}
                onClose={() => setSelectedSite(null)}
            />
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