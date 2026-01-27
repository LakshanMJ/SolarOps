import { prisma } from '../db/prisma.js'

const TARIFF_PER_KWH = 0.12
const MINUTES_PER_TELEMETRY = 10

export async function getDashboardKpisService() {
  const now = new Date()
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  // ------------------------
  // 1️⃣ Total energy today (kWh)
  const telemetrySum = await prisma.telemetry.aggregate({
    _sum: { acOutputKw: true },
    where: {
      timestamp: {
        gte: startOfToday,
        lte: now
      }
    }
  })

  const energyTodayKwh = (telemetrySum._sum.acOutputKw ?? 0) * (MINUTES_PER_TELEMETRY / 60)

  // ------------------------
  // 2️⃣ Revenue today
  const revenueTodayUsd = energyTodayKwh * TARIFF_PER_KWH

  // ------------------------
  // 3️⃣ Active alerts
  const activeAlerts = await prisma.alert.count({
    where: { resolved: false }
  })

  // ------------------------
  // 4️⃣ System health
  const totalInverters = await prisma.inverter.count()
  const activeInverters = await prisma.inverter.count({
    where: { status: 'Active' }
  })
  const systemHealthPercent = totalInverters === 0 ? 0 : (activeInverters / totalInverters) * 100

  // ------------------------
  // 5️⃣ Avg performance ratio (PR)
  const prResult = await prisma.$queryRaw<{ avg_pr: number }[]>`
    SELECT AVG(pr) AS avg_pr
    FROM (
      SELECT
        t."inverterId",
        SUM(t."acOutputKw") / COUNT(*) * 100 AS pr
      FROM "Telemetry" t
      JOIN "Inverter" i ON t."inverterId" = i."id"
      WHERE t."timestamp" >= ${startOfToday}
      GROUP BY t."inverterId"
    ) sub
  `

  // Adjust PR for 10-min telemetry interval
  const avgPerformanceRatio = (prResult[0]?.avg_pr ?? 0) * (MINUTES_PER_TELEMETRY / 60)

  // ------------------------
  // 6️⃣ Weekly energy output (last 7 days including today)
  const sevenDaysAgo = new Date(startOfToday)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  const weeklyEnergyRaw: { day: string; energy_kw: number }[] = await prisma.$queryRaw`
    SELECT
      to_char(t."timestamp", 'Dy') AS day,
      SUM(t."acOutputKw") AS energy_kw
    FROM "Telemetry" t
    WHERE t."timestamp" >= ${sevenDaysAgo}
    GROUP BY day
    ORDER BY MIN(t."timestamp")
  `

  const weeklyEnergy = weeklyEnergyRaw.map(r => ({
    name: r.day,
    value: parseFloat(((r.energy_kw * MINUTES_PER_TELEMETRY) / 60).toFixed(2)) // kWh
  }))

  // ------------------------
  // 7️⃣ Return all KPIs together
  return {
    totalEnergyTodayMWh: +(energyTodayKwh / 1000).toFixed(2), // convert kWh → MWh
    revenueTodayUsd: +revenueTodayUsd.toFixed(2),
    activeAlerts,
    systemHealthPercent: +systemHealthPercent.toFixed(1),
    avgPerformanceRatio: +avgPerformanceRatio.toFixed(1),
    weeklyEnergy
  }
}
