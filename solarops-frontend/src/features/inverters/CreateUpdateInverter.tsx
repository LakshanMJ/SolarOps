import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/Fetch";
import ImageUploadDropzone from "@/utils/ImageUploadDropzone";
import CloseIcon from "@mui/icons-material/Close";
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   MenuItem,
   TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

type Status = "Offline" | "Online" | "Maintenance";

interface Form {
   id?: string | null;
   name: string;
   status: Status;
   siteId: string;
   manufacturerId: string;
   serialNumber: string;
   model: string;
   firmwareVersion: string;
   capacityKw: number | null;
   installedAt: string;
   image: File | string | null;
}

interface Manufacturer {
   id: string;
   name: string;
}

interface Site {
   id: string;
   name: string;
}

interface InverterPayload {
   id?: string;
   name: string;
   status: Status;
   siteId: string;
   manufacturerId?: string;
   serialNumber?: string;
   model?: string;
   firmwareVersion?: string;
   capacityKw: number;
   installedAt: Date;
   image: string | null;
}

interface Props {
   open: boolean;
   inverterId: string;
   onClose: (open: boolean) => void;
   fetchInverters: () => void;
}

const CreateUpdateInverter = ({
   open,
   inverterId,
   onClose,
   fetchInverters,
}: Props) => {
   const token = localStorage.getItem("token");
   const { addToast } = useToast();

   const isEditMode = inverterId !== "new";

   const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
   const [sites, setSites] = useState<Site[]>([]);

   const [form, setForm] = useState<Form>({
      id: null,
      name: "",
      status: "Offline",
      siteId: "",
      manufacturerId: "",
      serialNumber: "",
      model: "",
      firmwareVersion: "",
      capacityKw: null,
      installedAt: "",
      image: null,
   });

   useEffect(() => {
      fetchData<Manufacturer[]>(BACKEND_URLS.MANUFACTURERS)
         .then(setManufacturers)
         .catch(console.error);

      fetchData<Site[]>(BACKEND_URLS.SITES)
         .then(setSites)
         .catch(console.error);
   }, []);

   useEffect(() => {
      if (!isEditMode) return;

      fetchData<any>(`${BACKEND_URLS.INVERTERS}/${inverterId}`)
         .then((data) => {
            setForm({
               id: data.id,
               name: data.name ?? "",
               status: data.status ?? "Offline",
               siteId: data.siteId ?? "",
               manufacturerId: data.manufacturerId ?? "",
               serialNumber: data.serialNumber ?? "",
               model: data.model ?? "",
               firmwareVersion: data.firmwareVersion ?? "",
               capacityKw: data.capacityKw ?? null,
               installedAt: data.installedAt ?? "",
               image: data.image ?? null,
            });
         })
         .catch(console.error);
   }, [inverterId, isEditMode]);

   const saveInverter = async () => {
      try {
         let imageFilename: string | null = null;

         if (form.image instanceof File) {
            const formData = new FormData();
            formData.append("image", form.image);

            const uploadRes = await fetch(BACKEND_URLS.UPLOAD_IMAGE, {
               method: "POST",
               body: formData,
            });

            if (!uploadRes.ok) throw new Error("Image upload failed");

            const uploadData: { filename: string } = await uploadRes.json();
            imageFilename = uploadData.filename;
         }

         const payload: InverterPayload = {
            name: form.name,
            status: form.status,
            siteId: form.siteId,
            manufacturerId: form.manufacturerId || undefined,
            serialNumber: form.serialNumber || undefined,
            model: form.model || undefined,
            firmwareVersion: form.firmwareVersion || undefined,
            capacityKw: form.capacityKw ?? 0,
            installedAt: new Date(),
            image:
               imageFilename ||
               (typeof form.image === "string" ? form.image : null),
         };

         const payloadToSend = isEditMode
            ? { ...payload, id: inverterId }
            : payload;

         const res = await fetch(
            isEditMode
               ? `${BACKEND_URLS.INVERTERS}/${inverterId}`
               : BACKEND_URLS.INVERTERS,
            {
               method: isEditMode ? "PUT" : "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(payloadToSend),
            }
         );

         if (!res.ok) throw new Error("Failed to save inverter");

         await res.json();

         addToast({
            type: "success",
            title: "Success",
            message: "Inverter saved successfully!",
         });

         onClose(false);
         fetchInverters();
      } catch (err) {
         const message =
            err instanceof Error ? err.message : "Error saving inverter";

         console.error(err);

         addToast({
            type: "error",
            title: "Error",
            message,
         });
      }
   };

   return (
      <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
         <DialogTitle>
            {isEditMode ? "Edit Inverter" : "Add New Inverter"}

            <IconButton
               onClick={() => onClose(false)}
               sx={{
                  position: "absolute",
                  right: 12,
                  top: 12,
               }}
            >
               <CloseIcon />
            </IconButton>
         </DialogTitle>

         <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
               <TextField
                  label="Inverter Name"
                  value={form.name}
                  onChange={(e) =>
                     setForm({ ...form, name: e.target.value })
                  }
               />

               <TextField
                  select
                  label="Manufacturer"
                  value={form.manufacturerId}
                  onChange={(e) =>
                     setForm({ ...form, manufacturerId: e.target.value })
                  }
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
                  onChange={(e) =>
                     setForm({ ...form, serialNumber: e.target.value })
                  }
               />

               <TextField
                  label="Model"
                  value={form.model}
                  onChange={(e) =>
                     setForm({ ...form, model: e.target.value })
                  }
               />

               <TextField
                  label="Firmware version"
                  value={form.firmwareVersion}
                  onChange={(e) =>
                     setForm({
                        ...form,
                        firmwareVersion: e.target.value,
                     })
                  }
               />

               <TextField
                  label="Capacity (kW)"
                  type="number"
                  value={form.capacityKw ?? ""}
                  onChange={(e) =>
                     setForm({
                        ...form,
                        capacityKw: e.target.value
                           ? parseFloat(e.target.value)
                           : null,
                     })
                  }
               />

               <TextField
                  select
                  label="Site"
                  value={form.siteId}
                  onChange={(e) =>
                     setForm({ ...form, siteId: e.target.value })
                  }
               >
                  {sites.map((s) => (
                     <MenuItem key={s.id} value={s.id}>
                        {s.name}
                     </MenuItem>
                  ))}
               </TextField>

               <ImageUploadDropzone
                  value={form.image}
                  onChange={(file) =>
                     setForm({ ...form, image: file })
                  }
               />
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