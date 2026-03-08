import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/fetch";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";


const CreateUpdateUsers = ({ open, userId, onClose, fetchUsers, rolesList }: any) => {
  const { addToast } = useToast();
  const isEditMode = userId !== "new";
  const token = localStorage.getItem("token");
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    roles: string[];
  }>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    roles: []
  });
  console.log(JSON.stringify(form), 'form')

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
          roles: data.roles?.map((r: any) => r.name) || []
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
        roles: form.roles
      };

      // POST or PUT
      const res = await fetch(
        isEditMode
          ? `${BACKEND_URLS.USERS}/${userId}`
          : BACKEND_URLS.USERS,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save user ");

      await res.json();

      addToast({
        type: "success",
        title: "Success",
        message: "User saved successfully!"
      });
      onClose(false);
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      addToast({
        type: "error",
        title: "Error",
        message: err.message || "Error saving user"
      });
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
            <Select
              labelId="roles-label"
              multiple
              value={form.roles} // array of role IDs
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, roles: typeof value === "string" ? value.split(",") : value });
              }}
              renderValue={(selected) => {
                // show role names for selected IDs
                return (selected as string[])
                  .map((id) => rolesList.find((r) => r.id === id)?.name)
                  .join(", ");
              }}
            >
              {rolesList.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  <Checkbox checked={form.roles.includes(role.id)} />
                  <ListItemText primary={role.name} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveUser}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUpdateUsers;