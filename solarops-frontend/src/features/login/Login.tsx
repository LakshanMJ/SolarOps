import { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  // Paper // Removed Paper, using Box for layout
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'; // Zap removed
import { AuthContext } from '@/app/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from "@/services/authService";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginAPI(email, password);
      if (data.token) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        backgroundColor: '#0f172a',
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Vertical Image Stripe */}
      <Box
  sx={{
    flex: '0 0 35%', 
    height: '100%',
    ml:'10%',
    position: 'relative',
    backgroundImage: 'url(login_img2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    // This creates a "fading out" effect on the right side of the image
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%', // Cover the whole image
      background: 'linear-gradient(to right, transparent 30%, #0f172a 1000%)',
      zIndex: 2,
    },
    // This adds a subtle dark tint to the bottom to make the "Sign In" area pop
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(15,23,42,0) 50%, #0f172a 100%)',
      zIndex: 1,
    }
  }}
/>

      {/* Right Side - Login Form Context */}
      <Box
        sx={{
          flex: 1, // Takes up the remaining 70% of the width
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative', // For background glow positioning
          backgroundImage: 'radial-gradient(circle at 50% -20%, #1e293b 0%, #0f172a 100%)',
        }}
      >
        {/* Decorative Background Glow (adjusted position) */}
        <Box
          sx={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
            top: '20%',
            right: '10%', // Positioned relative to the right side box
          }}
        />

        {/* Login Form Container (replacing Paper) */}
        <Box
          component="form" // Form functionality moved here
          onSubmit={handleSubmit}
          sx={{
            p: 5,
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo Section */}
          <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
            }}>
              <Box
                component="img"
                src="/solarops_logo.png"
                alt="SolarOps Logo"
                sx={{
                  width: 42,
                  height: 42,
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900, letterSpacing: -1 }}>
              SolarOps
            </Typography>
          </Box>

          {/* Form Fields Section */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              placeholder="User Name"
              variant="outlined"
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Mail size={18} color="#94a3b8" /></InputAdornment>,
              }}
              sx={inputStyles}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              variant="outlined"
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock size={18} color="#94a3b8" /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#94a3b8' }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
            {error && <Typography variant="body2" style={{ color: "red", textAlign: 'center' }}>{error}</Typography>}
            <Typography variant="caption" sx={{ color: '#f59e0b', alignSelf: 'flex-end', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Forgot password?
            </Typography>

            <Button
              fullWidth
              variant="contained"
              type="submit" // Important for form submission
              endIcon={<ArrowRight size={20} />}
              sx={{
                py: 1.5,
                backgroundColor: '#f59e0b',
                color: '#0f172a',
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#d97706',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 4, color: '#94a3b8' }}>
            Don't have an account? <span style={{ color: '#f59e0b', cursor: 'pointer', fontWeight: 600 }}>Contact Admin</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Custom styles for text fields to match the dark theme
const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(245, 158, 11, 0.5)' },
    '&.Mui-focused fieldset': { borderColor: '#f59e0b' },

    // 🔥 ADD THIS SECTION TO REMOVE THE BLUE BOX
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #0f172a inset', // Matches your card background
      WebkitTextFillColor: '#fff',
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '& input:-webkit-autofill:hover': {
      WebkitBoxShadow: '0 0 0 1000px #0f172a inset',
    },
    '& input:-webkit-autofill:focus': {
      WebkitBoxShadow: '0 0 0 1000px #0f172a inset',
    },
  },
  '& .MuiInputBase-input::placeholder': { color: '#94a3b8', opacity: 1 },
};

export default LoginPage;