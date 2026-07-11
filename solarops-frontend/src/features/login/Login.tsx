import { useContext, useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Button,
	InputAdornment,
	IconButton,

} from '@mui/material';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
	const [isSaving, setIsSaving] = useState(false);
	const [isDemoSaving, setIsDemoSaving] = useState(false);

	// const handleSubmit = async (e: React.FormEvent) => {
	//   e.preventDefault();
	//   try {
	//     const data = await loginAPI(email, password);
	//     if (data.token) {
	//       login(data.token);
	//       navigate("/dashboard");
	//     } else {
	//       setError(data.message || "Login failed");
	//     }
	//   } catch (err: any) {
	//     setError(err.message);
	//   }
	// };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setError("");
		setIsSaving(true);

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
		} finally {
			setIsSaving(false);
		}
	};

	const handleDemoLogin = async () => {
		setError("");
		setIsDemoSaving(true);

		try {
			const data = await loginAPI("lakshan@gmail.com", "1234");

			if (data.token) {
				login(data.token);
				navigate("/dashboard");
			} else {
				setError(data.message || "Demo login failed");
			}
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsDemoSaving(false);
		}
	};

	return (
		<Box
			sx={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				backgroundColor: '#0f172a',
				overflow: 'hidden',
			}}
		>
			{/* LEFT IMAGE */}
			<Box
				sx={{
					flex: { xs: '0 0 200px', md: '0 0 35%' },
					width: { xs: '100%', md: 'auto' },
					height: { xs: 200, md: '100%' },
					ml: { xs: 0, md: '10%' },
					position: 'relative',
					backgroundImage: 'url(login_img2.webp)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					overflow: 'hidden',
					display: { xs: 'none', sm: 'block' },
					'&::after': {
						content: '""',
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(to right, transparent 30%, #0f172a 100%), linear-gradient(to bottom, rgba(15,23,42,0) 50%, #0f172a 100%)',
					},
				}}
			/>

			{/* RIGHT SECTION */}
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					px: { xs: 2, sm: 3, md: 0 },
					py: { xs: 4, md: 0 },
					backgroundImage:
						'radial-gradient(circle at 50% -20%, #1e293b 0%, #0f172a 100%)',
				}}
			>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						p: { xs: 3, sm: 4, md: 5 },
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
					{/* LOGO */}
					<Box
						sx={{
							mb: 3,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Box
							sx={{
								width: 52,
								height: 52,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: '12px',
							}}
						>
							<Box
								component="img"
								src="/solarops_logo.png"
								alt="SolarOps Logo"
								sx={{ width: 40, height: 40 }}
							/>
						</Box>

						<Typography
							variant="h5"
							sx={{
								color: '#fff',
								fontWeight: 800,
								fontSize: { xs: '1.3rem', md: '1.5rem' },
							}}
						>
							SolarOps
						</Typography>
					</Box>

					{/* FORM */}
					<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
						<TextField
							fullWidth
							placeholder="User Name"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Mail size={18} color="#94a3b8" />
									</InputAdornment>
								),
							}}
							sx={inputStyles}
						/>

						<TextField
							fullWidth
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock size={18} color="#94a3b8" />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											sx={{ color: '#94a3b8' }}
										>
											{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={inputStyles}
						/>

						{error && (
							<Typography sx={{ color: 'red', textAlign: 'center' }}>
								{error}
							</Typography>
						)}

						<Typography
							variant="caption"
							sx={{
								color: '#f59e0b',
								alignSelf: 'flex-end',
							}}
						>
							Forgot password?
						</Typography>

						<Button
							fullWidth
							type="submit"
							disabled={isSaving || isDemoSaving}
							endIcon={!isSaving && <ArrowRight size={20} />}
							sx={{
								py: 1.3,
								backgroundColor: '#f59e0b',
								color: '#0f172a',
								fontWeight: 700,
								borderRadius: 2,
								textTransform: 'none',
								'&:hover': {
									backgroundColor: '#d97706',
								},
							}}
						>
							{isSaving ? 'Signing In...' : 'Sign In'}
						</Button>

						<Button
							fullWidth
							disabled={isSaving || isDemoSaving}
							onClick={handleDemoLogin}
							sx={{
								py: 1.2,
								color: '#f59e0b',
								fontWeight: 600,
								borderRadius: 2,
								textTransform: 'none',
								backgroundColor: 'rgba(245, 158, 11, 0.06)',
								border: '1px solid rgba(245, 158, 11, 0.35)',
								transition: 'all 0.25s ease',

								'&:hover': {
									backgroundColor: 'rgba(245, 158, 11, 0.12)',
									borderColor: '#f59e0b',
									transform: 'translateY(-1px)',
								},

								'&.Mui-disabled': {
									color: 'rgba(245, 158, 11, 0.4)',
									borderColor: 'rgba(245, 158, 11, 0.15)',
								},
							}}
						>
							{isDemoSaving ? 'Opening Demo...' : 'Continue as Demo Admin'}
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const inputStyles = {
	'& .MuiOutlinedInput-root': {
		color: '#fff',
		backgroundColor: '#0f172a',
		borderRadius: '10px',
		'& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
		'&:hover fieldset': { borderColor: 'rgba(245, 158, 11, 0.5)' },
		'&.Mui-focused fieldset': { borderColor: '#f59e0b' },

		'& input:-webkit-autofill': {
			WebkitBoxShadow: '0 0 0 1000px #0f172a inset',
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