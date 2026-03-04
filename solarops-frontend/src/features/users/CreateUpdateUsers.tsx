import { BACKEND_URLS } from "@/backendUrls";
import { fetchData } from "@/utils/fetch";
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
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

const CreateUpdateUsers = ({ open, userId, onClose, fetchUsers }: any) => {
  const isEditMode = userId !== "new";
  const [openMap, setOpenMap] = useState(false);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  }>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
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

  // fetch site for edit
  useEffect(() => {
    if (!isEditMode) return;

    fetchData(`${BACKEND_URLS.USERS}/${userId}`)
      .then((data) => {
        setForm({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          userName: data.userName ?? "",
          email: data.email ?? "",
        });
      })
      .catch(console.error);
  }, [userId]);

  // save user
  const saveUser = async () => {
    try {
      // Prepare payload
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        userName: form.userName,
        email: form.email,
      };

      // POST or PUT
      const res = await fetch(
        isEditMode
          ? `${BACKEND_URLS.USERS}/${userId}`
          : BACKEND_URLS.USERS,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save user ");

      await res.json();

      alert("User saved successfully!");
      onClose(false);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      alert("Error saving user: " + err.message);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="First Name"
              fullWidth
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
            <TextField
              label="User Name"
              fullWidth
              value={form.userName}
              onChange={(e) =>
                setForm({ ...form, userName: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveUser}>
            Save User
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

export default CreateUpdateUsers;