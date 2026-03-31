import { BACKEND_URLS } from "@/backendUrls";
import { useToast } from "@/components/toast/ToastContext";
import { fetchData } from "@/utils/fetch";
import SolarDatePicker from "@/utils/SolarDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import ImageUploadDropzone from "@/utils/ImageUploadDropzone";
import CloseIcon from "@mui/icons-material/Close";
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
   IconButton,
   InputLabel,
   ListItemText,
   MenuItem,
   Select,
   TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import TimezoneSelect from "react-timezone-select";
import SolarTimezoneSelect from "@/utils/SolarTimezoneSelect";

const NOTIFICATION_CHANNELS = [
   { id: 'email', name: 'Email' },
   { id: 'sms', name: 'SMS' },
   { id: 'push', name: 'Push Notification' },
   { id: 'whatsapp', name: 'WhatsApp' },
];

const CreateUpdateUsers = ({ open, userId, onClose, fetchUsers }: any) => {
   const { addToast } = useToast();
   const isEditMode = userId !== "new";
   const token = localStorage.getItem("token");
   const [rolesData, setRolesData] = useState<any>([])
   const [sites, setSites] = useState<any[]>([]);
   const [form, setForm] = useState<{
      firstName: string;
      lastName: string;
      userName: string;
      designation: string;
      employeeIdNumber: string;
      onboardingDate: Dayjs | null;
      email: string;
      contactNumber: string;
      assignedSites: any[];
      roles: any[];
      timezone: any;
      notificationChannels: any[];
      twoFactorEnabled: any;
      image: any;
   }>({
      firstName: "",
      lastName: "",
      userName: "",
      designation: "",
      employeeIdNumber: "",
      onboardingDate: null,
      email: "",
      contactNumber: "",
      assignedSites: [],
      roles: [],
      timezone: "",
      notificationChannels: [],
      twoFactorEnabled: false,
      image: null
   });
   console.log(JSON.stringify(form.roles), 'form')

   useEffect(() => {
      if (!isEditMode) return;

      fetchData(`${BACKEND_URLS.USERS}/${userId}`)
         .then((data) => {
            setForm({
               firstName: data.firstName ?? "",
               lastName: data.lastName ?? "",
               userName: data.userName ?? "",
               designation: data.designation ?? "",
               employeeIdNumber: data.employeeIdNumber ?? "",
               onboardingDate: data.onboardingDate ? dayjs(data.onboardingDate) : null,
               email: data.email ?? "",
               contactNumber: data.contactNumber ?? "",
               assignedSites: data.assignedSites?.map((s: any) => s.id) ?? [],
               roles: data.roles?.map((r: any) => r.id) || [],
               timezone: data.timezone ?? "",
               notificationChannels: data.notificationChannels ?? [],
               twoFactorEnabled: data.twoFactorEnabled ?? false,
               image: data.image ?? null
            });
         })
         .catch(console.error);
   }, [userId]);

   const saveUser = async () => {
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

            const uploadData = await uploadRes.json();
            imageFilename = uploadData.filename;
         }

         const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            userName: form.userName,
            designation: form.designation,
            employeeIdNumber: form.employeeIdNumber,
            onboardingDate: form.onboardingDate ? form.onboardingDate.toISOString() : null,
            email: form.email,
            contactNumber: form.contactNumber,
            assignedSites: form.assignedSites,
            roles: form.roles,
            timezone: form.timezone,
            notificationChannels: form.notificationChannels,
            twoFactorEnabled: form.twoFactorEnabled,
            image: imageFilename || (typeof form.image === "string" ? form.image : null),
         };

         const res = await fetch(
            isEditMode ? `${BACKEND_URLS.USERS}/${userId}` : BACKEND_URLS.USERS,
            {
               method: isEditMode ? "PUT" : "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
               body: JSON.stringify(payload),
            }
         );

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to save user");
         }

         await res.json();

         addToast({
            type: "success",
            title: "Success",
            message: `User ${isEditMode ? "updated" : "created"} successfully!`,
         });

         onClose(false);
         fetchUsers();
      } catch (err: any) {
         console.error(err);
         addToast({
            type: "error",
            title: "Error",
            message: err.message || "Error saving user",
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
      fetchData(BACKEND_URLS.SITES).then(setSites).catch(console.error);
   }, []);

   return (
      <>
         <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
               {isEditMode ? "Edit User" : "Add New User"}
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
                     label="Designation"
                     fullWidth
                     value={form.designation}
                     onChange={(e) =>
                        setForm({ ...form, designation: e.target.value })
                     }
                  />

                  <TextField
                     label="Employee ID number"
                     fullWidth
                     value={form.employeeIdNumber}
                     onChange={(e) =>
                        setForm({ ...form, employeeIdNumber: e.target.value })
                     }
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <SolarDatePicker
                        label="Onboarding Date"
                        value={form.onboardingDate}
                        onChange={(date) => setForm({ ...form, onboardingDate: date })}
                        size="medium" 
                     />
                  </LocalizationProvider>

                  <TextField
                     label="Email"
                     fullWidth
                     value={form.email}
                     onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                     }
                  />

                  <TextField
                     label="Contact Number"
                     fullWidth
                     value={form.contactNumber}
                     onChange={(e) =>
                        setForm({ ...form, contactNumber: e.target.value })
                     }
                  />

                  <FormControl fullWidth variant="outlined">
                     <InputLabel id="">Assigned Sites</InputLabel>
                     <Select
                        labelId=""
                        label="Assigned Sites:"
                        multiple
                        value={form.assignedSites}
                        onChange={(e) => {
                           const value = e.target.value as string[];
                           setForm({ ...form, assignedSites: value });
                        }}
                        renderValue={(selected) => (
                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((id) => {
                                 const site = sites?.find((r) => r.id === id);
                                 return (
                                    <Chip
                                       key={id}
                                       label={site?.name || id}
                                       size="small"
                                       variant="outlined"
                                       color="primary"
                                    />
                                 );
                              })}
                           </Box>
                        )}
                     >
                        {sites?.map((site) => (
                           <MenuItem key={site.name} value={site.id}>
                              <Checkbox checked={form.assignedSites.includes(site.id)} />
                              <ListItemText primary={site.name} />
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>

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

                  <SolarTimezoneSelect
                     label=""
                     value={form.timezone}
                     onChange={(tz) => setForm({ ...form, timezone: tz.value })}
                  />

                  <FormControl fullWidth variant="outlined">
                     <InputLabel id="notification-channels-label">Notification Channels</InputLabel>
                     <Select
                        labelId="notification-channels-label"
                        label="Notification Channels"
                        multiple
                        value={form.notificationChannels}
                        onChange={(e) => {
                           const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
                           setForm({ ...form, notificationChannels: value });
                        }}
                        renderValue={(selected) => (
                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((id) => {
                                 const channel = NOTIFICATION_CHANNELS.find((c) => c.id === id);
                                 return (
                                    <Chip
                                       key={id}
                                       label={channel?.name || id}
                                       size="small"
                                       variant="outlined"
                                       color="primary"
                                    />
                                 );
                              })}
                           </Box>
                        )}
                     >
                        {NOTIFICATION_CHANNELS.map((channel) => (
                           <MenuItem key={channel.id} value={channel.id}>
                              <Checkbox checked={form.notificationChannels.indexOf(channel.id) > -1} />
                              <ListItemText primary={channel.name} />
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined">
                     <InputLabel id="twofa-label">2FA Status</InputLabel>
                     <Select
                        labelId="twofa-label"
                        label="2FA Status"
                        value={form.twoFactorEnabled.toString()}
                        onChange={(e) =>
                           setForm({
                              ...form,
                              twoFactorEnabled: e.target.value === "true"
                           })
                        }
                     >
                        <MenuItem value="true">Enabled</MenuItem>
                        <MenuItem value="false">Disabled</MenuItem>
                     </Select>
                  </FormControl>

                  <ImageUploadDropzone value={form.image} onChange={(file) => setForm({ ...form, image: file })} />
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