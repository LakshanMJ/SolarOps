import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
				borderColor: 'rgba(255, 255, 255, 0.1)',
				bgcolor: '#0B1220',
			}}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				height="100%"
			>
				<Box
					component={Link}
					to="/dashboard"
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1.5,
						textDecoration: 'none',
						color: 'inherit',
						transition: 'opacity 0.2s',
						'&:hover': {
							opacity: 0.8,
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
						variant="h5"
						sx={{
							fontWeight: 800,
							letterSpacing: -0.5,
							fontSize: '1.4rem'
						}}
					>
						SolarOps
					</Typography>
				</Box>
			</Stack>
		</Box>
	);
}