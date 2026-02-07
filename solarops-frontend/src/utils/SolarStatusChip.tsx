import { Chip } from '@mui/material';

type SolarStatus = 'Online' | 'Degraded' | 'Critical' | 'Offline';

interface SolarChipProps {
    status: SolarStatus;
    size?: 'small' | 'medium';
}

const STATUS_STYLES: Record<SolarStatus, any> = {
    Online: {
        color: 'success',
    },
    Degraded: {
        color: 'warning',
    },
    Critical: {
        color: 'error',
    },
    Offline: {
        sx: {
            bgcolor: '#6B7280',
            color: '#fff',
        },
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
