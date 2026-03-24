// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "@/app/AuthContext";
// import { login as loginAPI } from "@/services/authService";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = await loginAPI(email, password);
//       if (data.token) {
//         login(data.token);
//         navigate("/dashboard"); // redirect after login
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//       <button type="submit">Login</button>
//       {error && <p style={{color: "red"}}>{error}</p>}
//     </form>
//   );
// }



import { useContext, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
        navigate("/dashboard"); // redirect after login
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a', // Matches your sidebar deep navy
        backgroundImage: 'radial-gradient(circle at 50% -20%, #1e293b 0%, #0f172a 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
        }}
      />

      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgba(30, 41, 59, 0.7)', // Slate 800 with transparency
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
            width: 56,          // Fixed width
            height: 56,         // Fixed height (matches width)
            display: 'flex',    // Use flexbox
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
          }}>
            {/* <Zap color="#f59e0b" fill="#f59e0b" size={32} /> */}
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
          {/* <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Monitor your energy output in real-time.
          </Typography> */}
        </Box>

        {/* Form Section */}
        <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth
            placeholder="User Name"
            variant="outlined"
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Typography variant="caption" sx={{ color: '#f59e0b', alignSelf: 'flex-end', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            Forgot password?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            endIcon={<ArrowRight size={20} />}
            onClick={handleSubmit}
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
      </Paper>
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