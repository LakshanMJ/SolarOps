import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  Chip,
} from '@mui/material'
import { useState } from 'react'

export default function Header() {
  const [range, setRange] = useState('7d')

  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        height: 56,
        px: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        {/* Left: Title */}
        <Typography variant="h6" fontWeight={600}>
          SolarOps
        </Typography>

        {/* Center: Range selector */}
        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <MenuItem value="24h">Last 24 Hours</MenuItem>
          <MenuItem value="7d">Last 7 Days</MenuItem>
          <MenuItem value="30d">Last 30 Days</MenuItem>
        </Select>

        {/* Right: System status */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            size="small"
            label="All systems operational"
            color="success"
            variant="outlined"
          />
        </Stack>
      </Stack>
    </Box>
  )
}
