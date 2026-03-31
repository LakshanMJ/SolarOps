import { Box, Typography } from '@mui/material';

const KpiCard = ({ label, value, status }: { label: string; value: string; status?: 'good' | 'warning' | 'critical' }) => {
  const isAlert = status === 'critical' || status === 'warning';
  
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
        backgroundColor: '#1e293b', // Slightly darker to make the glow pop
        borderRadius: 2,
        px: 2,
        py: 1.75,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        // Optional: subtle glow for the whole card on critical
        boxShadow: status === 'critical' ? `0 0 15px -5px ${statusColor}40` : 'none', 
      }}
    >
      {/* Side Accent Bar with Glow */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 4,
          height: '100%',
          backgroundColor: statusColor,
          // The Magic: Spread the glow using box-shadow
          boxShadow: isAlert ? `2px 0px 10px 1px ${statusColor}` : 'none',
        }}
      />

      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
        {label}
      </Typography>

      <Typography variant="h4" sx={{ fontWeight: 700, color: '#f8fafc' }}>
        {value}
      </Typography>

      {/* Status Text with Glow */}
      <Typography 
        variant="caption" 
        sx={{ 
          color: statusColor,
          fontWeight: isAlert ? 700 : 500,
          // Text shadow makes the font look like it's emitting light
          textShadow: isAlert ? `0 0 8px ${statusColor}80` : 'none',
          textTransform: 'uppercase',
          letterSpacing: 0.5
        }}
      >
        {status === 'good' ? 'Normal' : status === 'warning' ? 'Attention' : status === 'critical' ? 'Critical' : ''}
      </Typography>
    </Box>
  );
};

export default KpiCard;