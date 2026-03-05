import { Drawer, Box, Typography, Divider, Avatar, Chip, Stack } from '@mui/material';

interface Role {
  name: string;
}

interface User {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  roles: Role[];
  isActive: boolean;
}

interface UserDrawerProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const UserDrawer = ({ open, user, onClose }: UserDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 3, backgroundColor: '#1F2A38', color: '#fff' }}>
        {user && (
          <>
            {/* Header: Avatar + Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src={user.avatarUrl || undefined}
                alt={user.userName || user.firstName || 'User'}
                sx={{ width: 64, height: 64, border: '2px solid #4caf50' }}
              />
              <Box>
                <Typography variant="h6">
                  {user.firstName || ''} {user.lastName || ''}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#90A4AE' }}>
                  @{user.userName || 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 2, borderColor: '#37474F' }} />

            {/* Basic Info */}
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#90A4AE', mb: 1 }}
            >
              Contact
            </Typography>
            <Typography variant="body2">Email: {user.email}</Typography>
            {user.phone && <Typography variant="body2">Phone: {user.phone}</Typography>}

            <Divider sx={{ my: 2, borderColor: '#37474F' }} />

            {/* Roles */}
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#90A4AE', mb: 1 }}
            >
              Roles
            </Typography>
            {/* <Stack direction="row" spacing={1} flexWrap="wrap">
              {user.roles.length > 0 ? (
                user.roles.map((role) => (
                  <Chip
                    key={role.name}
                    label={role.name}
                    sx={{ color: '#fff', backgroundColor: '#4caf50', mb: 1 }}
                    size="small"
                  />
                ))
              ) : (
                <Typography variant="body2" sx={{ color: '#B0BEC5' }}>
                  No roles assigned
                </Typography>
              )}
            </Stack> */}

            <Divider sx={{ my: 2, borderColor: '#37474F' }} />

            {/* Status */}
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#90A4AE', mb: 1 }}
            >
              Status
            </Typography>
            <Chip
              label={user.isActive ? 'Active' : 'Inactive'}
              sx={{
                color: '#fff',
                backgroundColor: user.isActive ? '#4caf50' : '#f44336',
              }}
            />
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default UserDrawer;