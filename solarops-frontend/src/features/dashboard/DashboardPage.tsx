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
import { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetch';
import { BACKEND_URLS } from '@/backendUrls';
import Toast from '@/components/toast/Toast';

const DashboardPage = () => {

   const [dashboardData, setDashboardData] = useState<any>(null)

   useEffect(() => {
      async function fetchDashboardData() {
         try {
            const dashboardData = await fetchData(BACKEND_URLS.DASHBOARD)
            setDashboardData(dashboardData)
         } catch (err) {
            console.error('Failed to load dashboard data:', err)
         }
      }
      fetchDashboardData()
      const interval = setInterval(fetchDashboardData, 15000)

      return () => clearInterval(interval)
   }, [])

   if (!dashboardData) return <div>Loading...</div>

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
            <KpiCard label="Total Energy Today" value={`${dashboardData?.totalEnergyTodayMWh || 0} MWh`} status={dashboardData?.totalEnergyStatus} />
            <KpiCard label="Revenue Today" value={`USD ${dashboardData?.revenueTodayUsd?.toLocaleString() || '--'}`} status={dashboardData?.revenueStatus} />
            <KpiCard label="Active Alerts" value={dashboardData?.activeAlerts || 3} status={dashboardData?.activeAlertsStatus} />
            <KpiCard label="System Health" value={`${dashboardData?.systemHealthPercent || "--"}%`} status={dashboardData?.systemHealthStatus} />
            <KpiCard label="Average Power" value={`${dashboardData?.avgPowerKw || "--"} kW`} status={dashboardData?.outputDeviationStatus} />
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
                     data={dashboardData?.weeklyEnergy || []}
                     margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                     }}
                     >
                     <CartesianGrid strokeDasharray="3 3" />

                     <XAxis
                        dataKey="name"
                        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                     />

                     <YAxis
                        tick={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fill: '#94a3b8' }}
                        tickLine={false}
                        axisLine={false}
                     />

                     <Tooltip
                        contentStyle={{
                           backgroundColor: '#1e293b',
                           border: 'none',
                           borderRadius: '8px',
                           fontFamily: 'Inter, sans-serif',
                           fontSize: '14px'
                        }}
                        itemStyle={{ color: '#f59e0b', fontFamily: 'Inter, sans-serif' }}
                        labelStyle={{ color: '#fff', marginBottom: '4px' }}
                     />

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

export default DashboardPage;