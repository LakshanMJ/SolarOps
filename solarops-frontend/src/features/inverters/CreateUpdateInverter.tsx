import { BACKEND_URLS } from "@/backendUrls";
import { fetchData } from "@/utils/fetch";
import ImageUploadDropzone from "@/utils/ImageUploadDropzone";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface form {
    name: string;
    manufacturerId: string;
    serialNumber: string;
    capacityKw: number | null;
    siteId: string;
    status: 'Offline'
    image: File | null;
}

const CreateUpdateInverter = ({ open, inverterId, onClose, fetchInverters }: any) => {

    const isEditMode = inverterId !== "new";
    const [manufacturers, setManufacturers] = useState<any[]>([]);
    const [sites, setSites] = useState<any[]>([]);
    const [form, setForm] = useState<form>({
        name: "",
        manufacturerId: "",
        serialNumber: "",
        capacityKw: null,
        siteId: "",
        status: 'Offline',
        image: null
    });

    console.log(JSON.stringify(form, null, 2), 'form1111111111');

    const saveInverter = async () => {
        // setLoading(true);

        try {
            const payload = {
                name: form.name,
                siteId: form.siteId,
                manufacturerId: form.manufacturerId || undefined,
                serialNumber: form.serialNumber || undefined,
                capacityKw: form.capacityKw ?? 0,
                image: form.image?.name || null, // if backend only stores filename
                status: form.status,
                installedAt: new Date(),
            };

            const res = await fetch(BACKEND_URLS.INVERTERS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to save inverter");

            const data = await res.json();
            console.log("Inverter saved:", data);
            alert("Inverter saved successfully!");
        } catch (error: unknown) {
            console.error(error);
            alert("Error saving inverter: " + (error as any).message);
        } finally {
            onClose(false)
            fetchInverters();
            // setLoading(false);
        }
    };

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

    const fetchInverterDetails = async () => {
        try {
            if (!inverterId || inverterId === "new") return;

            const data = await fetchData(
                `${BACKEND_URLS.INVERTERS}/${inverterId}`
            );

            console.log(data.name,'data.namedata.namedata.name')
            // 🔥 map backend → form state
            setForm({
                name: data.name ?? "",
                manufacturerId: data.manufacturerId ?? "",
                serialNumber: data.serialNumber ?? "",
                capacityKw: data.capacityKw ?? null,
                siteId: data.siteId ?? "",
                status: data.status ?? "Offline",
                image: data.image ?? null,
            });

        } catch (err) {
            console.error("Failed to load inverter data:", err);
        }
    };

    useEffect(() => {
        fetchManufacturer();
        fetchSites();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            // fetch inverter details using inverterId
            fetchInverterDetails();
        }
    }, [inverterId]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
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
                        value={form.name}
                        fullWidth
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        } />
                    <TextField
                        select
                        label="Manufacturer"
                        value={form.manufacturerId}
                        onChange={(e) =>
                            setForm({ ...form, manufacturerId: e.target.value })
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
                        value={form.serialNumber}
                        fullWidth
                        onChange={(e) =>
                            setForm({ ...form, serialNumber: e.target.value })
                        } />
                    <TextField
                        label="Capacity (kW)"
                        value={form.capacityKw}
                        type="number"
                        fullWidth
                        onChange={(e) =>
                            setForm({ ...form, capacityKw: parseFloat(e.target.value) || 0 })
                        }
                    />
                    <TextField
                        select
                        label="Site"
                        value={form.siteId}
                        onChange={(e) =>
                            setForm({ ...form, siteId: e.target.value })
                        }
                        fullWidth
                    >
                        {sites.map((site) => (
                            <MenuItem key={site.id} value={site.id}>
                                {site.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <ImageUploadDropzone
                        value={form.image}
                        onChange={(file) => setForm({ ...form, image: file })}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onClose(false)}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => saveInverter()}>
                    Save Inverter
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateUpdateInverter;