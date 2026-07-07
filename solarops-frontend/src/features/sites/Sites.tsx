import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import SitesMap from "./SitesMap";
import {
    type GridColDef,
    type GridRenderCellParams,
} from "@mui/x-data-grid";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/Fetch";
import { BACKEND_URLS } from "@/backendUrls";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SiteDetailsDrawer from "@/components/kpi/SiteDetailsDrawer";
import DeleteModal from "@/utils/deleteModal";
import CreateUpdateSites from "./CreateUpdateSites";

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    const [loading, setLoading] = useState(true);
    const [sites, setSites] = useState<Site[]>([]);
    const [siteDeleteModal, setSiteDeleteModal] = useState({
        show: false,
        id: null as string | null,
    });

    const [activeSiteId, setActiveSiteId] = useState<string | null>(null);
    const [selectedSite, setSelectedSite] = useState<any>(null);

    const columns: GridColDef<any>[] = [
        {
            field: "name",
            headerName: "Site Name",
            flex: isMobile ? 2 : 2.5,
            minWidth: isMobile ? 160 : 220,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "location",
            headerName: "Location",
            flex: 3,
            minWidth: isMobile ? 180 : 240,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "capacity",
            headerName: "Capacity (MW)",
            type: "number",
            flex: 1,
            minWidth: isMobile ? 110 : 130,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "activeInverters",
            headerName: "Active Inverters",
            type: "number",
            flex: 1,
            minWidth: isMobile ? 120 : 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "alerts",
            headerName: "Alerts Count",
            type: "number",
            flex: 1,
            minWidth: isMobile ? 110 : 130,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "avgInverterPowerMW",
            headerName: "Avg Inverter Power (MW)",
            type: "number",
            sortable: true,
            flex: 1,
            minWidth: isMobile ? 140 : 170,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            flex: 1,
            minWidth: isMobile ? 120 : 150,
            align: "center",
            headerAlign: "center",

            renderCell: (params: GridRenderCellParams<any>) => (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: isMobile ? 0.25 : 0.5,
                    }}
                >
                    <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => setSelectedSite(params.row)}
                    >
                        <VisibilityIcon
                            sx={{ color: "white" }}
                            fontSize="small"
                        />
                    </IconButton>

                    <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => setActiveSiteId(params.row.id)}
                    >
                        <EditIcon
                            sx={{ color: "white" }}
                            fontSize="small"
                        />
                    </IconButton>

                    <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() =>
                            setSiteDeleteModal({
                                show: true,
                                id: params.row.id,
                            })
                        }
                    >
                        <DeleteIcon
                            sx={{ color: "white" }}
                            fontSize="small"
                        />
                    </IconButton>
                </Box>
            ),
        },
    ];
    const fetchSites = async (): Promise<void> => {
        setLoading(true);

        try {
            const siteData = await fetchData<Site[]>(BACKEND_URLS.SITES);
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

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "60vh",
                    width: "100%",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "stretch",
                        sm: "center",
                    },
                    gap: 2,
                    mb: 2,
                }}
            >
                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{ color: "#fff" }}
                >
                    Sites
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveSiteId("new")}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                    }}
                >
                    Add Site
                </Button>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 2,
                    mb: 2,
                }}
            >
                <SitesMap sites={sites} />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                }}
            >
                <SolarDataGrid
                    rows={sites}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    disableColumnSorting
                    pageSizeOptions={[5]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    columnHeaderHeight={isMobile ? 56 : 80}
                    rowHeight={isMobile ? 52 : 60}
                    sx={{
                        minWidth: isMobile ? 1100 : "100%",

                        "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                        },

                        "& .MuiDataGrid-columnHeader": {
                            display: "flex",
                            alignItems: "center",
                        },
                    }}
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
};

export default Sites;