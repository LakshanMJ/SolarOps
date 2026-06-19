import { Card, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface ThemedCardProps {
    children: ReactNode;
    sx?: SxProps<Theme>;
}

export default function ThemedCard({ children, sx }:ThemedCardProps) {
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
