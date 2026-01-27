import { prisma } from '../db/prisma.js'

const TARIFF_PER_KWH = 0.12

export async function getDashboardKpisService() {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const now = new Date()

  // 1. Total energy today
  const telemetrySum = await prisma.telemetry.aggregate({
    _sum: {
      acOutputKw: true
    },
    where: {
      timestamp: {
        gte: startOfToday,
        lte: now
      }
    }
  })

  const energyTodayKwh =
    (telemetrySum._sum.acOutputKw ?? 0) * (10 / 60)

  // 2. Revenue
  const revenueTodayUsd = energyTodayKwh * TARIFF_PER_KWH

  // 3. Active alerts
  const activeAlerts = await prisma.alert.count({
    where: { resolved: false }
  })

  // 4. System health
  const totalInverters = await prisma.inverter.count()
  const activeInverters = await prisma.inverter.count({
    where: { status: 'Active' }
  })

  const systemHealthPercent =
    totalInverters === 0
      ? 0
      : (activeInverters / totalInverters) * 100

  // 5. Avg performance ratio
  const prResult = await prisma.$queryRaw<
  { avg_pr: number }[]
>`
  SELECT AVG(pr) AS avg_pr
  FROM (
    SELECT
      t."inverterId",
      SUM(t."acOutputKw") /
      (MAX(i."capacityKw") * COUNT(*) * (10.0 / 60.0)) * 100 AS pr
    FROM "Telemetry" t
    JOIN "Inverter" i ON t."inverterId" = i."id"
    WHERE t."timestamp" >= ${startOfToday}
    GROUP BY t."inverterId"
  ) sub
`

  const avgPerformanceRatio = prResult[0]?.avg_pr ?? 0

  return {
    totalEnergyTodayMWh: +(energyTodayKwh / 1000).toFixed(2),
    revenueTodayUsd: +revenueTodayUsd.toFixed(2),
    activeAlerts,
    systemHealthPercent: +systemHealthPercent.toFixed(1),
    avgPerformanceRatio: +avgPerformanceRatio.toFixed(1)
  }
}
