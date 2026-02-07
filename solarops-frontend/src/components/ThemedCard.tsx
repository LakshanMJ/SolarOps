import { Card } from '@mui/material';

export default function ThemedCard({ children, sx }) {
  return (
    <Card
      sx={{
        backgroundColor: '#334155',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-sm)',
        color: 'var(--text-primary)',
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}
