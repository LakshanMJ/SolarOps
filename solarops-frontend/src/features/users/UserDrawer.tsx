import { Drawer, Box, Typography, Divider, Avatar } from '@mui/material';
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Chip } from '@mui/material';
import { formatDistanceToNow } from "date-fns";
import { BACKEND_URLS } from '@/backendUrls';
interface Role {
   name: string;
}

interface User {
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
   lastLoginAt?: string | Date;
}

interface UserDrawerProps {
   open: boolean;
   user: User | null;
   onClose: () => void;
}

const UserDrawer = ({ open, user, onClose }: UserDrawerProps) => {
   return (
      <Drawer anchor="right" open={open} onClose={onClose}>
         <Box sx={{ width: 340, p: 2, backgroundColor: '#273443', minHeight: '100vh', height: '100%', boxSizing: 'border-box' }}>
            {user && (
               <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                     <Avatar
                        src={user.image ? `${BACKEND_URLS.IMAGE_PATH}/${user.image}` : '/circular_img_placeholder.png'}
                        alt={user.userName || user.firstName || 'User'}
                        sx={{ width: 104, height: 104, border: '2px solid #4caf50' }}
                     />
                     <Box>
                        <Typography variant="h6">
                           {user.firstName || 'N/A'} {user.lastName || 'N/A'}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: '#90A4AE' }}>
                           @{user.userName || 'N/A'}
                        </Typography>
                     </Box>
                  </Box>

                  <Divider sx={{ mt: 2, mb: 2 }} />

                  <Typography
                     variant="subtitle2"
                     gutterBottom
                     sx={{
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        color: '#94a3b8',
                        marginBottom: '12px',
                        margin: 0
                     }}
                  >
                     Profile
                  </Typography>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Designation:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.designation || 'N/A'}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Employee ID number:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.employeeIdNumber || 'N/A'}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Onboarding Date:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.onboardingDate
                           ? dayjs(user.onboardingDate).format("DD MMM YYYY")
                           : "N/A"}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        E mail:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.email || 'N/A'}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Contact Number:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.contactNumber || 'N/A'}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Assigned Sites:
                     </Typography>
                     <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.assignedSites && user.assignedSites.length > 0 ? (
                           user.assignedSites.map((site) => (
                              <Chip
                                 key={site.id}
                                 label={site.name}
                                 size="small"
                                 sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    height: '20px',
                                    fontSize: '0.75rem'
                                 }}
                              />
                           ))
                        ) : (
                           <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                              N/A
                           </Typography>
                        )}
                     </Box>
                  </Box>

                  <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Roles:
                     </Typography>
                     <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.roles && user.roles.length > 0 ? (
                           user.roles.map((role) => (
                              <Chip
                                 key={role.id}
                                 label={role.name}
                                 size="small"
                                 sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    height: '20px',
                                    fontSize: '0.75rem'
                                 }}
                              />
                           ))
                        ) : (
                           <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                              N/A
                           </Typography>
                        )}
                     </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                     variant="subtitle2"
                     gutterBottom
                     sx={{
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        color: '#94a3b8',
                        marginBottom: '12px',
                        margin: 0
                     }}
                  >
                     Localization & Preferences
                  </Typography>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Time Zone:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.timezone || 'N/A'}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Notification Channels:
                     </Typography>
                     <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.notificationChannels && user.notificationChannels.length > 0 ? (
                           user.notificationChannels.map((notificationChannel) => (
                              <Chip
                                 key={notificationChannel}
                                 label={notificationChannel}
                                 size="small"
                                 sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    height: '20px',
                                    fontSize: '0.75rem'
                                 }}
                              />
                           ))
                        ) : (
                           <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                              N/A
                           </Typography>
                        )}
                     </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                     variant="subtitle2"
                     gutterBottom
                     sx={{
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        color: '#94a3b8',
                        marginBottom: '12px',
                        margin: 0
                     }}
                  >
                     Security
                  </Typography>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Two-Factor Authentication (2FA):
                     </Typography>
                     <Typography
                        component="span"
                        variant="body2"
                        sx={{
                           fontWeight: 600,
                           color: user.twoFactorEnabled ? '#22c55e' : '#94a3b8'
                        }}
                     >
                        {user.twoFactorEnabled ? 'Active' : 'Inactive'}
                     </Typography>
                  </Box>

                  <Box sx={{ mb: 0.5 }}>
                     <Typography component="span" variant="body2" sx={{ color: '#cbd5e1', mr: 1 }}>
                        Last Login:
                     </Typography>
                     <Typography component="span" variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                        {user.lastLoginAt ? (
                           <>
                              {formatDistanceToNow(new Date(user.lastLoginAt), { addSuffix: true })} (
                              {new Date(user.lastLoginAt).toLocaleString()})
                           </>
                        ) : (
                           "Never"
                        )}
                     </Typography>
                  </Box>
               </>
            )}
         </Box>
      </Drawer>
   );
};

export default UserDrawer;
