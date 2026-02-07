import { Box, Stack, Typography } from '@mui/material'
import KpiCard from '@/components/kpi/KpiCard'
import ThemedCard from '@/components/ThemedCard';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import LiveAlertCard from '@/components/kpi/LiveAlertCard'
import InverterHealth from '@/components/kpi/InverterHealth'

const data = [
  { name: 'Mon', value: 10 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 20 },
  { name: 'Thu', value: 40 },
  { name: 'Fri', value: 35 },
  { name: 'Sat', value: 50 },
  { name: 'Sun', value: 45 },
]

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <KpiCard label="Total Energy Today" value="12.4 MWh" status="good" />
        <KpiCard label="Revenue Today" value="LKR 245,000" status="good" />
        <KpiCard label="Active Alerts" value="3" status="warn" />
        <KpiCard label="System Health" value="98.2%" status="good" />
        <KpiCard label="Avg Performance Ratio" value="86%" status="bad" />
      </Box>

      <ThemedCard
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1" mb={2} sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          Weekly Energy Output
        </Typography>

        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--accent-primary)"
                fill="rgba(245, 158, 11, 0.25)"
              />

            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </ThemedCard>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          p: 0,
        }}
      >
        <Box
          sx={{
            flex: '1 1 300px',
            minWidth: 320,
          }}
        >
          <LiveAlertCard />
        </Box>

        <Box
          sx={{
            flex: '5 1 600px',
            minWidth: 800,
          }}
        >
          <InverterHealth />
        </Box>
      </Box>
    </Stack>
  )
}
