import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

export default function Header() {
	return (
		<Box
			component="header"
			sx={{
				width: '100%',
				height: 56,
				px: 3,
				boxSizing: 'border-box',
				borderBottom: '1px solid',
				borderColor: 'rgba(255, 255, 255, 0.1)', // Matches your dark theme better
				bgcolor: '#0B1220',
			}}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				height="100%"
			>
				{/* Wrap the Logo and Text in a Link */}
				<Box
					component={Link}
					to="/dashboard" // Your dashboard route
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1.5,
						textDecoration: 'none', // Removes the default link underline
						color: 'inherit',        // Keeps the text white
						transition: 'opacity 0.2s',
						'&:hover': {
							opacity: 0.8,         // Subtle visual feedback
						},
					}}
				>
					<Box
						component="img"
						src="/solarops_logo.png"
						alt="SolarOps Logo"
						sx={{
							width: 36,
							height: 36,
							objectFit: 'contain',
						}}
					/>
					<Typography
						variant="h5" // Bumped up slightly for a better logo feel
						sx={{
							fontWeight: 800,
							letterSpacing: -0.5,
							fontSize: '1.4rem' // Nice and bold for the brand name
						}}
					>
						SolarOps
					</Typography>
				</Box>
			</Stack>
		</Box>
	);
}