import { Chip } from '@mui/material';

type SolarStatus = 'Online' | 'Degraded' | 'Critical' | 'Offline';

interface SolarChipProps {
    status: SolarStatus;
    size?: 'small' | 'medium';
}

const STATUS_STYLES: Record<SolarStatus, any> = {
    Online: {
        sx: {
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#4ade80',
            borderColor: 'rgba(34, 197, 94, 0.3)'
        }

    },
    Degraded: {
        sx: {
            backgroundColor: 'rgba(245, 158, 11, 0.2)', // Soft Orange
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
        }
    },
    Critical: {
        sx: {
            backgroundColor: 'rgba(239, 68, 68, 0.2)', // Soft Red
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.3)',
        }
    },
    Offline: {
        sx: {
            backgroundColor: 'rgba(107, 114, 128, 0.2)', // Soft Gray
            color: '#9ca3af',
            border: '1px solid rgba(107, 114, 128, 0.3)',
        }
    },
};

export default function SolarChip({ status, size = 'small' }: SolarChipProps) {
    const style = STATUS_STYLES[status];

    return (
        <Chip
            label={status}
            size={size}
            color={style.color}
            sx={style.sx}
        />
    );
}
