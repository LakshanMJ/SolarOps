import { BACKEND_URLS } from '@/backendUrls';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, FileText, LayoutDashboard, MapPin, Power, Users, Zap } from 'lucide-react';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Sites', path: '/sites', icon: <MapPin size={20} /> },
    { label: 'Inverters', path: '/inverters', icon: <Zap size={20} /> },
    { label: 'Alerts', path: '/alerts', icon: <AlertTriangle size={20} /> },
    { label: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { label: 'Users and Roles', path: '/users', icon: <Users size={20} /> },
  ];

  const [user, setUser] = useState<any>(null);
  console.log(user, 'userrrrr')

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(BACKEND_URLS.CURRENT_USER, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error(err));
    }
  }, []);

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
              startIcon={item.icon}
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
          borderTop: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // user on left, logout on right
        }}
      >
        <Box>
          <Typography variant="body2">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            {user?.title}
          </Typography>
        </Box>

        <IconButton
          onClick={() => {
            localStorage.removeItem("token"); // clear token
            window.location.reload(); // or navigate to login
          }}
          sx={{ color: "#f59e0b" }}
        >
          <Power />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideBar;