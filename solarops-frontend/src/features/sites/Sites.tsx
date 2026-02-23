import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField, Typography } from "@mui/material";
import SitesMap from "./SitesMap";
import { type GridColDef } from "@mui/x-data-grid";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetch";
import { BACKEND_URLS } from "@/backendUrls";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const Sites = () => {

    const [sites, setSites] = useState<Site[]>([]);
    const [openAddSiteModal, setOpenAddSiteModal] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [form, setForm] = useState<{
        name: string;
        region: string;
        peakCapacityMw: string;
        latitude: number | null;
        longitude: number | null;
    }>({
        name: "",
        region: "",
        peakCapacityMw: "",
        latitude: null,
        longitude: null,
    });

    console.log(form, 'form')

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Site Name', flex: 2.5, minWidth: 200, align: 'center', headerAlign: 'center' },
        { field: 'location', headerName: 'Location', flex: 3, minWidth: 220, align: 'center', headerAlign: 'center' },
        { field: 'capacity', headerName: 'Capacity (MW)', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'activeInverters', headerName: 'Active Inverters', type: 'number', flex: 1, minWidth: 140, align: 'center', headerAlign: 'center' },
        { field: 'alerts', headerName: 'Alerts Count', type: 'number', flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
        { field: 'avgPR', headerName: 'Avg PR (%)', type: 'number', sortable: true, flex: 1, minWidth: 120, align: 'center', headerAlign: 'center' },
    ];

    const MapClickHandler = ({ setForm, form }) => {
        useMapEvents({
            click(e) {
                setForm({
                    ...form,
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
            },
        });

        return null;
    }

    const fetchSites = async () => {
        try {
            const siteData = await fetchData(BACKEND_URLS.SITES);
            setSites(siteData);
        } catch (err) {
            console.error("Failed to load site data:", err);
        }
    };

    const saveSite = async () => {
        try {
            if (
                !form.name ||
                !form.region ||
                !form.peakCapacityMw ||
                form.latitude == null ||
                form.longitude == null
            ) {
                alert("Please fill all fields and pick a location on the map.");
                return;
            }

            // Convert peakCapacityMw to number before sending
            const payload = {
                ...form,
                peakCapacityMw: Number(form.peakCapacityMw),
            };

            const res = await fetch(BACKEND_URLS.SITES, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            let data: any = null;

            // Only parse JSON if content-length > 0
            const text = await res.text();
            if (text) {
                data = JSON.parse(text);
            }

            if (!res.ok) {
                throw new Error(data?.error || "Failed to create site");
            }

            console.log("Site created:", data);

            setOpenAddSiteModal(false);
            setForm({
                name: "",
                region: "",
                peakCapacityMw: "",
                latitude: null,
                longitude: null,
            });

            fetchSites();

        } catch (error: unknown) {
            if (error instanceof Error) alert(error.message);
            else alert("Something went wrong");
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
                    onClick={() => setOpenAddSiteModal(true)}
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
            <Dialog
                open={openAddSiteModal}
                onClose={() => setOpenAddSiteModal(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add New Site</DialogTitle>
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
                            label="Site Name"
                            fullWidth
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            value={
                                form.latitude && form.longitude
                                    ? `${form.latitude.toFixed(4)}, ${form.longitude.toFixed(4)}`
                                    : ""
                            }
                            placeholder="Pick location from map"
                            InputProps={{
                                readOnly: true,
                            }}
                            onClick={() => setOpenMap(true)}
                        />
                        <TextField
                            select
                            label="Region"
                            fullWidth
                            value={form.region}
                            onChange={(e) => setForm({ ...form, region: e.target.value })}
                        >
                            {["Western", "Central", "Southern", "Northern", "Eastern", "Uva", "Sabaragamuwa"].map(
                                (region) => (
                                    <MenuItem key={region} value={region}>
                                        {region}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                        <TextField
                            label="Peak Capacity (MW)"
                            type="number"
                            fullWidth
                            onChange={(e) =>
                                setForm({ ...form, peakCapacityMw: e.target.value })
                            }
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenAddSiteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => saveSite()}>
                        Save Site
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openMap}
                onClose={() => setOpenMap(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Select Site Location</DialogTitle>

                <DialogContent sx={{ height: 400 }}>
                    <MapContainer
                        center={[6.9271, 79.8612]}
                        zoom={12}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MapClickHandler form={form} setForm={setForm} />

                        {form.latitude && form.longitude && (
                            <Marker position={[form.latitude, form.longitude]} />
                        )}
                    </MapContainer>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenMap(false)}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Sites;