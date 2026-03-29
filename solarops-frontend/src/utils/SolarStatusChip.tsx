import { Chip } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

type StatusConfig = {
  label?: string;
  sx: SxProps<Theme>;
};

type StatusChipProps = {
  status: string;
  size?: 'small' | 'medium';
  config?: Record<string, StatusConfig>;
};

const DEFAULT_STATUS_STYLES: Record<string, StatusConfig> = {
  success: {
    sx: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      color: '#4ade80',
      border: '1px solid rgba(34, 197, 94, 0.3)',
    },
  },
  warning: {
    sx: {
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      color: '#fbbf24',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
  },
  error: {
    sx: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
  },
  neutral: {
    sx: {
      backgroundColor: 'rgba(107, 114, 128, 0.2)',
      color: '#9ca3af',
      border: '1px solid rgba(107, 114, 128, 0.3)',
    },
  },
};

export default function StatusChip({
  status,
  size = 'small',
  config = DEFAULT_STATUS_STYLES,
}: StatusChipProps) {
  const key = status?.toLowerCase();

  const style =
    config[key] ||
    DEFAULT_STATUS_STYLES[key] ||
    DEFAULT_STATUS_STYLES['neutral'];

  return (
    <Chip
      label={style?.label || status}
      size={size}
      sx={style?.sx}
    />
  );
}