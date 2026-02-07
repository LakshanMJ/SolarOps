import { Box, Typography } from "@mui/material";

const LiveIndicator = () => {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0 }}>
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    boxShadow: '0 0 0 rgba(34,197,94, 0.7)',
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                        '0%': { boxShadow: '0 0 0 0 rgba(34,197,94, 0.7)' },
                        '70%': { boxShadow: '0 0 0 8px rgba(34,197,94, 0)' },
                        '100%': { boxShadow: '0 0 0 0 rgba(34,197,94, 0)' },
                    },
                }}
            />
            <Typography variant="caption" color="success.main">
                Live
            </Typography>
        </Box>

    )
}

export default LiveIndicator;