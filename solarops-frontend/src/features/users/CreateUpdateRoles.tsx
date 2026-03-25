import { BACKEND_URLS } from "@/backendUrls";
import { fetchData } from "@/utils/fetch";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useToast } from "@/components/toast/ToastContext";


const CreateUpdateRoles = ({ open, roleId, onClose, fetchRoles }: any) => {
  const { addToast } = useToast();
  const isEditMode = roleId !== "new";
  const token = localStorage.getItem("token");
  const [form, setForm] = useState<{
    id: null;
    name: string;
  }>({
    id: null,
    name: ""
  });


  // fetch site for edit
  useEffect(() => {
    if (!isEditMode) return;

    fetchData(`${BACKEND_URLS.ROLES}/${roleId}`)
      .then((data) => {
        setForm({
          id: data.id,
          name: data.name ?? ""
        });
      })
      .catch(console.error);
  }, [roleId]);

  // save role
  const saveUser = async () => {
    try {
      // Prepare payload
      const payload = {
        name: form.name
      };

      const payloadToSend = isEditMode
        ? { ...payload, id: roleId }
        : payload;

      // POST or PUT
      const res = await fetch(
        isEditMode
          ? `${BACKEND_URLS.ROLES}/${roleId}`
          : BACKEND_URLS.ROLES,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payloadToSend),
        }
      );

      if (!res.ok) throw new Error("Failed to save role ");

      await res.json();

      addToast({
        type: "success",
        title: "Success",
        message: "Role saved successfully"
      });
      onClose(false);
      fetchRoles();
    } catch (err: any) {
      console.error(err);
      addToast({
        type: "error",
        title: "Error",
        message: err.message || "Failed to save role"
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditMode ? "Edit Role" : "Add New Role"}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Role Name"
              fullWidth
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveUser}>
            Save Role
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUpdateRoles;