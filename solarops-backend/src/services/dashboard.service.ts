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

  const energyTodayKwh =
    (telemetrySum._sum.acOutputKw ?? 0) *
    (MINUTES_PER_TELEMETRY / 60)

  // ------------------------
  // 2️⃣ Revenue today
  const revenueTodayUsd = energyTodayKwh * TARIFF_PER_KWH

  // ------------------------
  // 3️⃣ Active alerts
  const activeAlerts = await prisma.alert.count({
    where: { status: 'Open' }
  })

  let activeAlertsStatus: 'good' | 'warning' | 'critical' = 'good'
  if (activeAlerts > 50) {
    activeAlertsStatus = 'critical'
  } else if (activeAlerts > 20) {
    activeAlertsStatus = 'warning'
  }

  // ------------------------
  // 4️⃣ System health
  const totalInverters = await prisma.inverter.count()
  const activeInverters = await prisma.inverter.count({
    where: { status: 'Online' }
  })

  const systemHealthPercent =
    totalInverters === 0
      ? 0
      : (activeInverters / totalInverters) * 100

  let systemHealthStatus: 'good' | 'warning' | 'critical' = 'good'
  if (systemHealthPercent < 80) {
    systemHealthStatus = 'critical'
  } else if (systemHealthPercent < 90) {
    systemHealthStatus = 'warning'
  }

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

  const avgPerformanceRatio =
    (prResult[0]?.avg_pr ?? 0) *
    (MINUTES_PER_TELEMETRY / 60)

  // ------------------------
  // 6️⃣ Weekly energy output (last 7 days including today)
  const sevenDaysAgo = new Date(startOfToday)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  const weeklyEnergyRaw: { day: string; energy_kw: number }[] =
    await prisma.$queryRaw`
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
    value: parseFloat(
      ((r.energy_kw * MINUTES_PER_TELEMETRY) / 60).toFixed(2)
    )
  }))

  // ------------------------
  // 7️⃣ 7-day baseline average (kWh per day)
  const baselineRaw: { total_kw: number }[] =
    await prisma.$queryRaw`
      SELECT
        SUM(t."acOutputKw") AS total_kw
      FROM "Telemetry" t
      WHERE t."timestamp" >= ${sevenDaysAgo}
    `

  const baselineEnergyKwh =
    ((baselineRaw[0]?.total_kw ?? 0) *
      (MINUTES_PER_TELEMETRY / 60)) / 7

  // ------------------------
  // 8️⃣ Total energy & revenue status logic
  const deviation =
    baselineEnergyKwh === 0
      ? 0
      : (energyTodayKwh - baselineEnergyKwh) /
        baselineEnergyKwh

  const HARD_MIN_PERCENT = 0.6
  const WARNING_DROP_PERCENT = 0.15

  const hardMinimum = baselineEnergyKwh * HARD_MIN_PERCENT

  let totalEnergyStatus: 'good' | 'warning' | 'critical' = 'good'
  if (energyTodayKwh < hardMinimum) {
    totalEnergyStatus = 'critical'
  } else if (deviation <= -WARNING_DROP_PERCENT) {
    totalEnergyStatus = 'warning'
  }

  const revenueStatus = totalEnergyStatus

  // ------------------------
  // 9️⃣ Avg Performance Ratio status (compared to 7-day baseline)
  const prBaselineRaw: { avg_pr: number }[] =
    await prisma.$queryRaw`
      SELECT AVG(pr) AS avg_pr
      FROM (
        SELECT
          t."inverterId",
          SUM(t."acOutputKw") / COUNT(*) * 100 AS pr
        FROM "Telemetry" t
        JOIN "Inverter" i ON t."inverterId" = i."id"
        WHERE t."timestamp" >= ${sevenDaysAgo} 
          AND t."timestamp" < ${startOfToday}
        GROUP BY t."inverterId"
      ) sub
    `

  const prBaseline =
    (prBaselineRaw[0]?.avg_pr ?? 0) *
    (MINUTES_PER_TELEMETRY / 60)

  const prDeviation =
    prBaseline === 0
      ? 0
      : (avgPerformanceRatio - prBaseline) / prBaseline

  const PR_WARNING_DROP = 0.15
  const PR_CRITICAL_DROP = 0.25

  let prStatus: 'good' | 'warning' | 'critical' = 'good'
  if (prDeviation <= -PR_CRITICAL_DROP) {
    prStatus = 'critical'
  } else if (prDeviation <= -PR_WARNING_DROP) {
    prStatus = 'warning'
  }

  // ------------------------
  // 10️⃣ Return all KPIs
  return {
    totalEnergyTodayMWh: +(energyTodayKwh / 1000).toFixed(2),
    totalEnergyStatus,
    revenueTodayUsd: +revenueTodayUsd.toFixed(2),
    revenueStatus,
    activeAlerts,
    activeAlertsStatus,
    systemHealthPercent: +systemHealthPercent.toFixed(1),
    systemHealthStatus,
    avgPerformanceRatio: +avgPerformanceRatio.toFixed(1),
    prStatus,
    weeklyEnergy
  }
}
  