import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/fetch";
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
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import CloseIcon from "@mui/icons-material/Close";

const CreateUpdateSites = ({ open, siteId, onClose, fetchSites }: any) => {
   const token = localStorage.getItem("token");
   const { addToast } = useToast();
   const isEditMode = siteId !== "new";
   const [openMap, setOpenMap] = useState(false);
   const [form, setForm] = useState<{
      id: string | null;
      name: string;
      region: string;
      peakCapacityMw: string;
      latitude: number | null;
      longitude: number | null;
   }>({
      id: null,
      name: "",
      region: "",
      peakCapacityMw: "",
      latitude: null,
      longitude: null,
   });

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

   useEffect(() => {
      if (!isEditMode) return;

      fetchData(`${BACKEND_URLS.SITES}/${siteId}`)
         .then((data) => {
            setForm({
               id: data.id,
               name: data.name ?? "",
               region: data.region ?? "",
               peakCapacityMw: data.peakCapacityMw?.toString() ?? "",
               latitude: data.latitude ?? null,
               longitude: data.longitude ?? null,
            });
         })
         .catch(console.error);
   }, [siteId]);

   const saveSite = async () => {
      try {
         const payload = {
            name: form.name,
            region: form.region,
            peakCapacityMw: parseFloat(form.peakCapacityMw) || 0,
            latitude: form.latitude || undefined,
            longitude: form.longitude || undefined,
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
                  "Authorization": `Bearer ${token}`
               },
               body: JSON.stringify(payloadToSend),
            }
         );

         if (!res.ok) throw new Error("Failed to save site");

         await res.json();

         addToast({
            type: "success",
            title: "Success",
            message: "Site saved successfully!"
         });
         onClose(false);
         fetchSites();
      } catch (err: any) {
         console.error(err);
         addToast({
            type: "error",
            title: "Error",
            message: err.message || "Error saving site"
         });
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
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => onClose(false)}>Cancel</Button>
               <Button variant="contained" onClick={saveSite}>
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
};

export default CreateUpdateSites;