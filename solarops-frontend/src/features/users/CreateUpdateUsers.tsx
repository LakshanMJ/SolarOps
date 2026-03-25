import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/fetch";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";


const CreateUpdateUsers = ({ open, userId, onClose, fetchUsers }: any) => {
  const { addToast } = useToast();
  const isEditMode = userId !== "new";
  const token = localStorage.getItem("token");
  const [rolesData, setRolesData] = useState<any>([])
  console.log(rolesData, 'rolesDatarolesDatarolesDatarolesData')
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    roles: any[];
  }>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    roles: []
  });
  console.log(JSON.stringify(form.roles), 'form')

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
          roles: data.roles?.map((r: any) => r.id) || []
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

  async function fetchRoles() {
    try {
      const rolesData = await fetchData(BACKEND_URLS.ROLES);
      setRolesData(rolesData);
    } catch (err) {
      console.error('Failed to load roles data:', err);
    }
  }


  useEffect(() => {
    fetchRoles();
  }, []);

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

            {/* 🔥 FIXED SELECT WITH LABEL */}
              <FormControl fullWidth variant="outlined">
                <InputLabel id="roles-label">Roles</InputLabel>
                <Select
                  labelId="roles-label"
                  label="Roles"
                  multiple
                  value={form.roles}
                  onChange={(e) => {
                    const value = e.target.value as string[];
                    setForm({ ...form, roles: value });
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((id) => {
                        const role = rolesData?.find((r) => r.id === id);
                        return (
                          <Chip
                            key={id}
                            label={role?.name || id}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {rolesData?.map((role) => (
                    <MenuItem key={role.name} value={role.id}>
                      <Checkbox checked={form.roles.includes(role.id)} />
                      <ListItemText primary={role.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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