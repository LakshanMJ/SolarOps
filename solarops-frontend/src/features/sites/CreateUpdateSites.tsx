import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/Fetch";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField,
} from "@mui/material";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploadDropzone from "@/utils/ImageUploadDropzone";

interface SiteForm {
    id: string | null;
    name: string;
    region: string;
    peakCapacityMw: string;
    latitude: number | null;
    longitude: number | null;
    image: File | string | null;
}

interface CreateUpdateSitesProps {
    open: boolean;
    siteId: string;
    onClose: (open: boolean) => void;
    fetchSites: () => Promise<void> | void;
}

interface MapClickHandlerProps {
    form: SiteForm;
    setForm: Dispatch<SetStateAction<SiteForm>>;
}

interface SiteResponse {
    id: string;
    name: string;
    region: string;
    peakCapacityMw: number;
    latitude: number | null;
    longitude: number | null;
    image: File | string | null;
}

const CreateUpdateSites = ({
    open,
    siteId,
    onClose,
    fetchSites,
}: CreateUpdateSitesProps) => {
    const token = localStorage.getItem("token");
    const { addToast } = useToast();
    const isEditMode = siteId !== "new";
    const [isSaving, setIsSaving] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [form, setForm] = useState<{
        id: string | null;
        name: string;
        region: string;
        peakCapacityMw: string;
        latitude: number | null;
        longitude: number | null;
        image: File | string | null;
    }>({
        id: null,
        name: "",
        region: "",
        peakCapacityMw: "",
        latitude: null,
        longitude: null,
        image: null,
    });

    const MapClickHandler = ({ setForm, form }: MapClickHandlerProps) => {
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

    useEffect(() => {
        if (!isEditMode) return;

        fetchData<SiteResponse>(`${BACKEND_URLS.SITES}/${siteId}`)
            .then((data) => {
                setForm({
                    id: data.id,
                    name: data.name ?? "",
                    region: data.region ?? "",
                    peakCapacityMw: data.peakCapacityMw?.toString() ?? "",
                    latitude: data.latitude ?? null,
                    longitude: data.longitude ?? null,
                    image: data.image ?? null,
                });
            })
            .catch(console.error);
    }, [siteId]);

    const saveSite = async () => {
        try {
            setIsSaving(true);
            let imageUrl: string | null = null;

            if (form.image instanceof File) {
                const formData = new FormData();
                formData.append("image", form.image);

                const uploadRes = await fetch(BACKEND_URLS.UPLOAD_IMAGE, {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error("Image upload failed");

                const uploadData: { url: string } = await uploadRes.json();

                imageUrl = uploadData.url;
            }

            const payload = {
                name: form.name,
                region: form.region,
                peakCapacityMw: parseFloat(form.peakCapacityMw) || 0,
                latitude: form.latitude || undefined,
                longitude: form.longitude || undefined,
                image:
                    imageUrl ||
                    (typeof form.image === "string" ? form.image : null),
            };

            const payloadToSend = isEditMode
                ? { ...payload, id: siteId }
                : payload;

            const res = await fetch(
                isEditMode
                    ? `${BACKEND_URLS.SITES}/${siteId}`
                    : BACKEND_URLS.SITES,
                {
                    method: isEditMode ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payloadToSend),
                }
            );

            if (!res.ok) throw new Error("Failed to save site");

            await res.json();

            addToast({
                type: "success",
                title: "Success",
                message: "Site saved successfully!",
            });

            onClose(false);
            fetchSites();
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Error saving site";

            console.error(err);

            addToast({
                type: "error",
                title: "Error",
                message,
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    {isEditMode ? "Edit Site" : "Add New Site"}
                    <IconButton
                        aria-label="close"
                        onClick={() => onClose(false)}
                        sx={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
                            color: (theme) => theme.palette.grey[500],
                            '&:hover': {
                                color: 'white',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                        <TextField
                            label="Site Name"
                            fullWidth
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            // disabled={isEditMode}
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
                            disabled={isEditMode}
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
                            value={form.peakCapacityMw}
                            onChange={(e) =>
                                setForm({ ...form, peakCapacityMw: e.target.value })
                            }
                        />
                        <ImageUploadDropzone
                            value={form.image}
                            onChange={(file) =>
                                setForm({ ...form, image: file })
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)} disabled={isSaving}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={saveSite}
                        disabled={isSaving}
                        startIcon={
                            isSaving ? (
                                <CircularProgress size={18} color="inherit" />
                            ) : null
                        }
                    >
                        {isSaving ? "Saving..." : "Save Site"}
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
                    <Button variant="contained" onClick={() => setOpenMap(false)} disabled={isSaving} >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateUpdateSites;