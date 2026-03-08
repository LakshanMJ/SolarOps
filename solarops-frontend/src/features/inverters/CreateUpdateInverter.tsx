import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/fetch";
import ImageUploadDropzone from "@/utils/ImageUploadDropzone";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Form {
  id?: string | null;
  name: string;
  manufacturerId: string;
  serialNumber: string;
  capacityKw: number | null;
  siteId: string;
  status: "Offline";
  image: File | string | null;
}

const CreateUpdateInverter = ({ open, inverterId, onClose, fetchInverters }: any) => {
  const token = localStorage.getItem("token");
  const { addToast } = useToast();
  const isEditMode = inverterId !== "new";
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [form, setForm] = useState<Form>({
    id: null,
    name: "",
    manufacturerId: "",
    serialNumber: "",
    capacityKw: null,
    siteId: "",
    status: "Offline",
    image: null,
  });

  // fetch options
  useEffect(() => {
    fetchData(BACKEND_URLS.MANUFACTURERS).then(setManufacturers).catch(console.error);
    fetchData(BACKEND_URLS.SITES).then(setSites).catch(console.error);
  }, []);

  // fetch inverter for edit
  useEffect(() => {
    if (!isEditMode) return;

    fetchData(`${BACKEND_URLS.INVERTERS}/${inverterId}`)
      .then((data) => {
        setForm({
          id: data.id,
          name: data.name ?? "",
          manufacturerId: data.manufacturerId ?? "",
          serialNumber: data.serialNumber ?? "",
          capacityKw: data.capacityKw ?? null,
          siteId: data.siteId ?? "",
          status: data.status ?? "Offline",
          image: data.image ?? null,
        });
      })
      .catch(console.error);
  }, [inverterId]);

  // save inverter
  const saveInverter = async () => {
    try {
      let imageFilename: string | null = null;

      // Upload file if new
      if (form.image instanceof File) {
        const formData = new FormData();
        formData.append("image", form.image);

        const uploadRes = await fetch(BACKEND_URLS.UPLOAD_IMAGE, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData = await uploadRes.json();
        imageFilename = uploadData.filename;
      }

      // Prepare payload
      const payload = {
        name: form.name,
        siteId: form.siteId,
        manufacturerId: form.manufacturerId || undefined,
        serialNumber: form.serialNumber || undefined,
        capacityKw: form.capacityKw ?? 0,
        image:
          imageFilename || (typeof form.image === "string" ? form.image : null),
        status: form.status,
        installedAt: new Date(),
      };

      const payloadToSend = isEditMode
        ? { ...payload, id: inverterId }
        : payload;

      // POST or PUT
      const res = await fetch(
        isEditMode
          ? `${BACKEND_URLS.INVERTERS}/${inverterId}`
          : BACKEND_URLS.INVERTERS,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payloadToSend),
        }
      );

      if (!res.ok) throw new Error("Failed to save inverter");
      await res.json();

      addToast({
        type: "success",
        title: "Success",
        message: "Inverter saved successfully!"
      });
      onClose(false);
      fetchInverters();
    } catch (err: any) {
      console.error(err);
      addToast({
        type: "error",
        title: "Error",
        message: err.message || "Error saving inverter"
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? "Edit Inverter" : "Add New Inverter"}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Inverter Name"
            value={form.name}
            fullWidth
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            select
            label="Manufacturer"
            value={form.manufacturerId}
            onChange={(e) => setForm({ ...form, manufacturerId: e.target.value })}
            fullWidth
          >
            {manufacturers.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Serial Number"
            value={form.serialNumber}
            fullWidth
            onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
          />
          <TextField
            label="Capacity (kW)"
            type="number"
            value={form.capacityKw}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, capacityKw: parseFloat(e.target.value) || 0 })
            }
          />
          <TextField
            select
            label="Site"
            value={form.siteId}
            onChange={(e) => setForm({ ...form, siteId: e.target.value })}
            fullWidth
          >
            {sites.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
          <ImageUploadDropzone value={form.image} onChange={(file) => setForm({ ...form, image: file })} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button variant="contained" onClick={saveInverter}>
          Save Inverter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUpdateInverter;