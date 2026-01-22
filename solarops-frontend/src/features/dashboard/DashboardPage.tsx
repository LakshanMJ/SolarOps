import { Box, Stack, Card, Typography } from '@mui/material'
import KpiCard from '@/components/kpi/KpiCard'
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
      {/* KPI */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        <Box display="flex" gap={2}>
          <KpiCard label="Total Energy Today" value="12.4 MWh" />
          <KpiCard label="Revenue Today" value="12.4 MWh" />
          <KpiCard label="Active Alerts" value="12.4 MWh" />
          <KpiCard label="System Health" value="12.4 MWh" />
          <KpiCard label="Avg Performance Ratio" value="12.4 MWh" />
        </Box>
      </Box>

      {/* Chart Card */}
      <Card
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1" mb={2}>
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
                stroke="#8884d8"
                fill="#8884d8"
              />

            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          p: 2,
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
            flex: '2 1 600px',
            minWidth: 600,
          }}
        >
          <InverterHealth />
        </Box>
      </Box>
    </Stack>
  )
}
