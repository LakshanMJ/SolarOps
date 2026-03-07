import { prisma } from '../db/prisma.js'

const MINUTES_PER_TELEMETRY = 10
const TARIFF_PER_KWH = 0.12
const HARD_MIN_PERCENT = 0.6

const now = new Date()
const startOfToday = new Date()
const sevenDaysAgo = new Date(startOfToday)
startOfToday.setHours(0, 0, 0, 0)


// 1 - Total energy today (kWh)
export async function energyTodayKwh() {
    const telemetrySum = await prisma.telemetry.aggregate({
        _sum: { acOutputKw: true },
        where: {
            timestamp: {
                gte: startOfToday,
                lte: now
            }
        }
    })
    return (telemetrySum._sum.acOutputKw ?? 0) * (MINUTES_PER_TELEMETRY / 60)
}


// 2 - Revenue today
export async function revenueTodayUsd() {
    return (await energyTodayKwh()) * TARIFF_PER_KWH
}


// 3 - Active alerts
export async function activeAlerts() {
    return await prisma.alert.count({
        where: { status: 'Open' }
    })
}

// 4 - Active alerts Status
export async function activeAlertsStatus(): Promise<'good' | 'warning' | 'critical'> {
    const count = await activeAlerts();
    if (count > 50) return 'critical';
    if (count > 20) return 'warning';
    return 'good';
}

// 5 - System health Percent
export async function systemHealthPercent() {
    const totalInverters = await prisma.inverter.count()
    const activeInverters = await prisma.inverter.count({
        where: { status: 'Online' }
    })

    const systemHealthPercent = totalInverters === 0 ? 0 : (activeInverters / totalInverters) * 100

    return systemHealthPercent;
}

// 6 - System Health Status
export async function systemHealthStatus(): Promise<'good' | 'warning' | 'critical'> {
    const percent = await systemHealthPercent(); // await the async function

    if (percent < 80) return 'critical';
    if (percent < 90) return 'warning';
    return 'good';
}

// 7 - Avg performance ratio (PR)
export async function avgPerformanceRatio() {
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
    const avgPerformanceRatio = (prResult[0]?.avg_pr ?? 0) * (MINUTES_PER_TELEMETRY / 60)
    return avgPerformanceRatio;
}

// 8 - Weekly energy output (last 7 days including today)
export async function weeklyEnergy() {
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
    return weeklyEnergy;
}

// day baseline average (kWh per day) //
export async function sevenDaybaselineEnergyKwh() {
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

    return baselineEnergyKwh;
}

// 9 -  Total energy status
export async function totalEnergyStatus() {
    const WARNING_DROP_PERCENT = 0.15
    const hardMinimum = await sevenDaybaselineEnergyKwh() * HARD_MIN_PERCENT
    const deviation = await sevenDaybaselineEnergyKwh() === 0 ? 0 : (await energyTodayKwh() - await sevenDaybaselineEnergyKwh()) / await sevenDaybaselineEnergyKwh()

    let totalEnergyStatus: 'good' | 'warning' | 'critical' = 'good'
    if (await energyTodayKwh() < hardMinimum) {
        totalEnergyStatus = 'critical'
    } else if (deviation <= -WARNING_DROP_PERCENT) {
        totalEnergyStatus = 'warning'
    }
    return totalEnergyStatus
}

// 10 - Avg Performance Ratio (PR) status (compared to 7-day baseline)
export async function prStatus() {
    const PR_WARNING_DROP = 0.15
    const PR_CRITICAL_DROP = 0.25
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
    const prBaseline = (prBaselineRaw[0]?.avg_pr ?? 0) * (MINUTES_PER_TELEMETRY / 60)
    const prDeviation = prBaseline === 0 ? 0 : (await avgPerformanceRatio() - prBaseline) / prBaseline

    let prStatus: 'good' | 'warning' | 'critical' = 'good'
    if (prDeviation <= -PR_CRITICAL_DROP) {
        prStatus = 'critical'
    } else if (prDeviation <= -PR_WARNING_DROP) {
        prStatus = 'warning'
    }
    return prStatus;
}