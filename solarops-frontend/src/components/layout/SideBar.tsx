import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Sites', path: '/sites' },
    { label: 'Inverters', path: '/inverters' },
    { label: 'Alerts', path: '/alerts' },
    { label: 'Telemetry', path: '/telemetry' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Map View', path: '/map-view' },
    { label: 'Control Room', path: '/control-room' },
    { label: 'Maintenance', path: '/maintenance' },
    { label: 'Reports', path: '/reports' },
  ];

  return (
    <Box
      component="aside"
      sx={{
        width: 260,
        height: '100%',
        backgroundColor: '#0f172a',
        color: '#e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #1e293b',
      }}
    >
      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          px: 2,
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="text"
            onClick={() => navigate(item.path)}
            sx={{
              justifyContent: 'flex-start',
              color: '#e5e7eb',
              textTransform: 'none',
              px: 2,
              py: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#1e293b',
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* User */}
      <Box
        component="footer"
        sx={{
          px: 3,
          py: 2,
          borderTop: '1px solid #1e293b',
        }}
      >
        <Typography variant="body2">Admin User</Typography>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Operations Manager
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBar;
