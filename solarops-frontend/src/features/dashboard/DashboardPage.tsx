import { Box, Stack, Card, Typography } from '@mui/material'
import KpiCard from '@/components/kpi/KpiCard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Mon', energy: 12 },
  { name: 'Tue', energy: 15 },
  { name: 'Wed', energy: 10 },
  { name: 'Thu', energy: 18 },
  { name: 'Fri', energy: 20 },
  { name: 'Sat', energy: 14 },
  { name: 'Sun', energy: 16 },
]

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      {/* KPI */}
      <KpiCard label="Total Energy Today" value="12.4 MWh" />

      {/* Chart Card */}
      <Card
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1" mb={2}>
          Weekly Energy Output
        </Typography>

        {/* 🔑 Chart container MUST have height */}
        <Box sx={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="energy" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Stack>
  )
}
