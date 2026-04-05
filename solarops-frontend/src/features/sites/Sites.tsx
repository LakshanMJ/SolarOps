import { Box, Button, IconButton, Typography } from "@mui/material";
import SitesMap from "./SitesMap";
import { type GridColDef } from "@mui/x-data-grid";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SiteDetailsDrawer from "@/components/kpi/SiteDetailsDrawer";
import DeleteModal from "@/utils/deleteModal";
import CreateUpdateSites from "./CreateUpdateSites";

const sites = [
  {
    "id": "a63e4530-fe02-4d53-9c0b-93f4321e1195",
    "name": "Solar Ops – Axiom Grid",
    "location": "Western Grid",
    "lat": 6.984481463066517,
    "lng": 80.0017547607422,
    "capacity": 100,
    "activeInverters": 4,
    "alerts": 2,
    "avgInverterPowerMW": 80,
    "health": "Good"
  },
  {
    "id": "868e537e-ceda-4689-94bf-9b877796360d",
    "name": "Solar Ops – Rajagiriya",
    "location": "Western Grid",
    "lat": 6.919550777671755,
    "lng": 79.90734100341797,
    "capacity": 400,
    "activeInverters": 7,
    "alerts": 5,
    "avgInverterPowerMW": 400,
    "health": "Good"
  },
  {
    "id": "bebf99cd-c4b6-469f-886b-46b79c90a56b",
    "name": "Solar Ops - Lux Station",
    "location": "Western Grid",
    "lat": 6.939066733200864,
    "lng": 80.10809898376466,
    "capacity": 600,
    "activeInverters": 2,
    "alerts": 0,
    "avgInverterPowerMW": 590,
    "health": "Good"
  },
  {
    "id": "c108591d-a148-4d35-9202-b9111e68bb27",
    "name": "Solar Ops - Colombo Hyperion Array 1",
    "location": "Western Grid",
    "lat": 6.93031853679935,
    "lng": 80.14753818511964,
    "capacity": 600,
    "activeInverters": 9,
    "alerts": 0,
    "avgInverterPowerMW": 580,
    "health": "Critical"
  },
  {
    "id": "c3ec2729-4f66-4a28-83f1-914a89248b14",
    "name": "Solar Ops - Kosgama 3",
    "location": "Central Grid",
    "lat": 6.931170571807687,
    "lng": 80.13187408447267,
    "capacity": 450,
    "activeInverters": 5,
    "alerts": 4,
    "avgInverterPowerMW": 450,
    "health": "Good"
  },
  {
    "id": "66822138-205f-4c39-9bd9-ea957de16998",
    "name": "Solar Ops - Solaris Prime",
    "location": "Western Grid",
    "lat": 6.939172170268549,
    "lng": 80.13944864273073,
    "capacity": 400,
    "activeInverters": 3,
    "alerts": 1,
    "avgInverterPowerMW": 395,
    "health": "Good"
  },
  {
    "id": "94356eda-fcdb-4139-bb04-e94658de32ea",
    "name": "Solar Ops - Kosgama 2",
    "location": "Western Grid",
    "lat": 6.939137024581946,
    "lng": 80.13041496276857,
    "capacity": 600,
    "activeInverters": 8,
    "alerts": 7,
    "avgInverterPowerMW": 788,
    "health": "Good"
  },
  {
    "id": "293fe03a-e4fb-4733-a3f5-8350984ff276",
    "name": "Solar Ops - Kosgama 1",
    "location": "Western Grid",
    "lat": 6.94023719376982,
    "lng": 80.13374090194704,
    "capacity": 200,
    "activeInverters": 6,
    "alerts": 2,
    "avgInverterPowerMW": 176,
    "health": "Good"
  },
  {
    "id": "68f947a2-461d-454c-a217-a9422bdd3639",
    "name": "Solar Ops - Petroleum Storage Terminals - kolonnawa",
    "location": "Western Grid",
    "lat": 6.930545391140754,
    "lng": 79.88783597946168,
    "capacity": 200,
    "activeInverters": 1,
    "alerts": 2,
    "avgInverterPowerMW": 200,
    "health": "Good"
  },
  {
    "id": "38aeb036-1e73-4af7-8254-391b7d83da48",
    "name": "Solar Ops - Colombo Hyperion Array 2",
    "location": "Western Grid",
    "lat": 6.929459044794308,
    "lng": 79.89277124404909,
    "capacity": 300,
    "activeInverters": 11,
    "alerts": 0,
    "avgInverterPowerMW": 288,
    "health": "Good"
  },
  {
    "id": "9152c9aa-24ed-4096-b0b7-5170ba7f0662",
    "name": "Solar Ops - Pugoda Main",
    "location": "Western Grid",
    "lat": 6.974494517378332,
    "lng": 80.11393547058105,
    "capacity": 300,
    "activeInverters": 4,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "e3703985-e0f3-4588-bdd2-01fb6ca3d565",
    "name": "Solar Ops - Pugoda Substation 1",
    "location": "Western Grid",
    "lat": 6.982858517762168,
    "lng": 80.11290550231934,
    "capacity": 500,
    "activeInverters": 5,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "b458a206-4361-4990-871c-03b59bbb6f03",
    "name": "Solar Ops - Solstice Valley",
    "location": "Western Grid",
    "lat": 6.90450327758512,
    "lng": 80.07522583007812,
    "capacity": 200,
    "activeInverters": 2,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "e6245037-e438-4643-83c5-79eb24433e39",
    "name": "Solar Ops – St Alban's Place",
    "location": "Western Grid",
    "lat": 6.892266150815663,
    "lng": 79.85386848449708,
    "capacity": 600,
    "activeInverters": 10,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Unknown"
  },
  {
    "id": "7739eedf-2dbd-46fd-b1de-cecb07468b72",
    "name": "Solar Ops – Marine Drive",
    "location": "Western Grid",
    "lat": 6.905452282445427,
    "lng": 79.85045671463013,
    "capacity": 400,
    "activeInverters": 8,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "49d060c1-f2e0-4a9b-9ff9-8f65d5aaaa39",
    "name": "Solar Ops – Port City 4",
    "location": "Western Grid",
    "lat": 6.936844819179939,
    "lng": 79.83450293540956,
    "capacity": 500,
    "activeInverters": 3,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "e1ddac44-dfa6-4488-a7df-cdac9121edde",
    "name": "Solar Ops – Port City 3",
    "location": "Western Grid",
    "lat": 6.932036450676862,
    "lng": 79.83747482299806,
    "capacity": 400,
    "activeInverters": 1,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Warning"
  },
  {
    "id": "76e630be-5192-4a91-8208-d491a280f220",
    "name": "Solar Ops – Port City 2",
    "location": "Western Grid",
    "lat": 6.932739377107661,
    "lng": 79.8321318626404,
    "capacity": 300,
    "activeInverters": 6,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "e060426d-1941-47f1-b9c4-3ff62931f999",
    "name": "Solar Ops – Port City 1",
    "location": "Western Grid",
    "lat": 6.936453154472985,
    "lng": 79.8355007171631,
    "capacity": 200,
    "activeInverters": 12,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "6625c8d5-4e12-4c11-b67b-1ab17214960a",
    "name": "Solar Ops - Colombo Hyperion Array 3",
    "location": "Western Grid",
    "lat": 6.938926150407226,
    "lng": 79.93652343750001,
    "capacity": 2000,
    "activeInverters": 4,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "2b7c05d4-8d7c-4561-9b0e-37116c8e85d3",
    "name": "site xssa",
    "location": "Western Grid",
    "lat": 6.944945634177261,
    "lng": 79.9003028869629,
    "capacity": 500,
    "activeInverters": 2,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Critical"
  },
  {
    "id": "007d8cc8-2ac0-4b19-816e-e1ced663a5a1",
    "name": "Solar Ops – Zenith",
    "location": "Central Grid",
    "lat": 6.943015829648644,
    "lng": 79.89429473876955,
    "capacity": 232323,
    "activeInverters": 9,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "c09f5c7d-98c2-4ccc-8da7-9f8fe5a1b337",
    "name": "Solar Ops – Delta",
    "location": "Central Grid",
    "lat": 6.920615878261911,
    "lng": 79.89910125732423,
    "capacity": 5656,
    "activeInverters": 1,
    "alerts": 92,
    "avgInverterPowerMW": 13.9,
    "health": "Warning"
  },
  {
    "id": "e55015a0-9b81-4767-a37f-f81fc37158ab",
    "name": "Solar Ops – Red Dune",
    "location": "Central Grid",
    "lat": 6.919593413189493,
    "lng": 79.89635467529298,
    "capacity": 34434,
    "activeInverters": 4,
    "alerts": 145,
    "avgInverterPowerMW": 599.1,
    "health": "Good"
  },
  {
    "id": "5f2953a6-0f00-4926-bba7-c77e9be08efe",
    "name": "Solar Ops – Aurora",
    "location": "Northern",
    "lat": 6.87412401757478,
    "lng": 79.88330841064455,
    "capacity": 400,
    "activeInverters": 7,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "8b082b73-7147-4575-a838-4baec116573a",
    "name": "Solar Ops – Helios Ridge",
    "location": "Northern",
    "lat": 6.876779966590584,
    "lng": 79.99832153320314,
    "capacity": 300,
    "activeInverters": 10,
    "alerts": 0,
    "avgInverterPowerMW": 0,
    "health": "Good"
  },
  {
    "id": "0519c717-f305-46bd-8b93-081e382ae2ca",
    "name": "Solar Ops – Nova Plains",
    "location": "Northern",
    "lat": 6.916434837065657,
    "lng": 79.89326477050783,
    "capacity": 344,
    "activeInverters": 11,
    "alerts": 702,
    "avgInverterPowerMW": 1100.4,
    "health": "Good"
  }
]

const Sites = () => {

    // const [sites, setSites] = useState<Site[]>([]);
    const [siteDeleteModal, setSiteDeleteModal] = useState({
        show: false,
        id: null as string | null,
    });
    const [activeSiteId, setActiveSiteId] = useState<string | null>(null);
    const [selectedSite, setSelectedSite] = useState<(typeof sites)[number] | null>(null);

    const columns: GridColDef[] = [
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
            renderCell: (params) => (
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
        // fetchSites();
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
                    columnHeaderHeight={80}
                    pageSizeOptions={[5, 10]}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    disableColumnSorting
                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
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