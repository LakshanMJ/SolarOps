import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import KpiCard from "@/components/kpi/KpiCard";
import ThemedCard from "@/components/ThemedCard";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
	Area,
} from "recharts";
import LiveAlertCard from "@/components/kpi/LiveAlertCard";
import InverterHealth from "@/components/kpi/InverterHealth";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/Fetch";
import { BACKEND_URLS } from "@/backendUrls";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

type Status = "good" | "warning" | "critical" | undefined;

interface WeeklyEnergy {
	name: string;
	value: number;
}

interface DashboardData {
	weeklyEnergy: WeeklyEnergy[];

	totalEnergyTodayMWh: number;
	totalEnergyStatus: Status;

	revenueTodayUsd: number;
	revenueStatus: Status;

	activeAlerts: string | number;
	activeAlertsStatus: Status;

	systemHealthPercent: number;
	systemHealthStatus: Status;

	avgPowerKw: number;
	outputDeviationStatus: Status;
}

const DashboardPage = () => {

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [loading, setLoading] = useState({
		kpis: true,
		chart: true,
	});

	const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

	useEffect(() => {
		async function fetchDashboardData() {
			setLoading({
				kpis: true,
				chart: true,
			});

			try {
				const dashboardData = await fetchData<DashboardData>(
					BACKEND_URLS.DASHBOARD
				);

				setDashboardData(dashboardData);
			} catch (err) {
				console.error("Failed to load dashboard data:", err);
			} finally {
				setLoading({
					kpis: false,
					chart: false,
				});
			}
		}

		fetchDashboardData();

		// const interval = setInterval(fetchDashboardData, 15000);
		// return () => clearInterval(interval);
	}, []);

	return (
		<Stack
			spacing={{ xs: 2, md: 3 }}
			sx={{
				width: "100%",
				overflowX: "hidden",
			}}
		>
			{/* KPI SECTION */}

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2,1fr)",
						md: "repeat(3,1fr)",
						lg: "repeat(5,1fr)",
					},
					gap: 2,
				}}
			>
				{loading.kpis ? (
					Array.from({ length: 5 }).map((_, i) => (
						<Box
							key={i}
							sx={{
								height: 90,
								borderRadius: 2,
								bgcolor: "#1e293b",
								animation: "pulse 1.5s infinite",
							}}
						/>
					))
				) : (
					<>
						<KpiCard
							label="Total Energy Today"
							value={`${dashboardData?.totalEnergyTodayMWh || 0} MWh`}
							status={dashboardData?.totalEnergyStatus}
						/>

						<KpiCard
							label="Revenue Today"
							value={`USD ${dashboardData?.revenueTodayUsd?.toLocaleString() || "--"
								}`}
							status={dashboardData?.revenueStatus}
						/>

						<KpiCard
							label="Active Alerts"
							value={dashboardData?.activeAlerts || 0}
							status={dashboardData?.activeAlertsStatus}
						/>

						<KpiCard
							label="System Health"
							value={`${dashboardData?.systemHealthPercent || "--"}%`}
							status={dashboardData?.systemHealthStatus}
						/>

						<KpiCard
							label="Average Power"
							value={`${dashboardData?.avgPowerKw || "--"} kW`}
							status={dashboardData?.outputDeviationStatus}
						/>
					</>
				)}
			</Box>

			{/* CHART */}

			<ThemedCard
				sx={{
					p: {
						xs: 2,
						md: 3,
					},
				}}
			>
				<Typography
					sx={{
						mb: 2,
						fontWeight: 600,
						color: "var(--text-primary)",
						fontSize: {
							xs: 15,
							sm: 16,
							md: 18,
						},
					}}
				>
					Weekly Energy Output
				</Typography>

				<Box
					sx={{
						width: "100%",
						height: {
							xs: 260,
							sm: 300,
							md: 340,
							lg: 380,
						},
					}}
				>
					{loading.chart ? (
						<CircularProgress />
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={dashboardData?.weeklyEnergy}
								margin={{
									top: 20,
									right: 20,
									left: 10,
									bottom: 20,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />

								<XAxis
									dataKey="name"
									tick={{
										fontFamily: "Inter",
										fontSize: 12,
										fill: "#94a3b8",
									}}
									tickLine={false}
									axisLine={false}
									label={{
										value: "Date",
										position: "insideBottom",
										offset: -10,
										fill: "#94a3b8",
									}}
								/>

								<YAxis
									tick={{
										fontFamily: "Inter",
										fontSize: 12,
										fill: "#94a3b8",
									}}
									tickFormatter={(value) =>
										isMobile ? `${value / 1000}k` : value.toLocaleString()
									}
									tickLine={false}
									axisLine={false}
									label={{
										value: "Energy (kWh)",
										angle: -90,
										position: "insideLeft",
										offset: -5,
										fill: "#94a3b8",
									}}
								/>

								<Tooltip
									contentStyle={{
										backgroundColor: "#1e293b",
										border: "none",
										borderRadius: 8,
									}}
									itemStyle={{
										color: "#f59e0b",
									}}
									labelStyle={{
										color: "#fff",
									}}
									separator=""
									formatter={(value: number | undefined) => [
										value !== undefined
											? `${new Intl.NumberFormat("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											}).format(value)} kWh`
											: "0.00 kWh",
										"",
									]}
								/>

								<Area
									type="monotone"
									dataKey="value"
									stroke="var(--accent-primary)"
									fill="rgba(245,158,11,.25)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					)}
				</Box>
			</ThemedCard>

			{/* ALERTS + INVERTERS */}

			<Box
				sx={{
					display: "grid",
					gap: 2,

					gridTemplateColumns: {
						xs: "1fr",
						sm: "1fr",
						md: "1fr",
						lg: "320px 1fr",
						xl: "350px 1fr",
					},

					alignItems: "stretch",
				}}
			>
				<Box
					sx={{
						width: "100%",
					}}
				>
					<LiveAlertCard />
				</Box>

				<Box
					sx={{
						width: "100%",
						minWidth: 0,
					}}
				>
					<InverterHealth />
				</Box>
			</Box>
		</Stack>
	);
};

export default DashboardPage;