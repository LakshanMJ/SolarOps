import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        backgroundColor: '#1E293B',
        color: '#e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #1e293b',
      }}
    >
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
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;

          return (
            <Button
              key={item.label}
              variant="text"
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: 1.5,

                color: isSelected ? '#f59e0b' : '#e5e7eb',

                border: isSelected
                  ? '1px solid #f59e0b'
                  : '1px solid transparent',

                backgroundColor: isSelected
                  ? 'rgba(245, 158, 11, 0.08)'
                  : 'transparent',

                '&:hover': {
                  backgroundColor: isSelected
                    ? 'rgba(245, 158, 11, 0.12)'
                    : '#1e293b',
                  border: isSelected
                    ? '1px solid #f59e0b'
                    : '1px solid transparent',
                },

                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </Button>

          );
        })}
      </Box>

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
