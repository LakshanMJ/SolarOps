import { Box, Typography } from '@mui/material';

const KpiCard = ({ label, value, status }: { label: string; value: string; status?: 'good' | 'warning' | 'critical' }) => {
  const statusColor =
    status === 'good'
      ? '#22c55e'
      : status === 'warning'
        ? '#facc15'
        : status === 'critical'
          ? '#ef4444'
          : '#38bdf8';

  return (
    <Box
      sx={{
        backgroundColor: '#334155',
        border: '1px solid #334155',
        borderRadius: 2,
        px: 2,
        py: 1.75,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 4,
          height: '100%',
          backgroundColor: statusColor,
          opacity: 0.9,
        }}
      />

      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
        {label}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>

      <Typography variant="caption" sx={{ color: statusColor }}>
        {status === 'good' ? 'Normal' : status === 'warning' ? 'Attention' : status === 'critical' ? 'Critical' : ''}
      </Typography>
    </Box>
  );
};

export default KpiCard;
