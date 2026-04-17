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

// 7 - Average power output (kW)
export async function avgPowerKw() {
    const result = await prisma.$queryRaw<{ avg_output: number }[]>`
    SELECT AVG(avg_output) AS avg_output
    FROM (
      SELECT
        t."inverterId",
        SUM(t."acOutputKw") / COUNT(*) AS avg_output
      FROM "Telemetry" t
      JOIN "Inverter" i ON t."inverterId" = i."id"
      WHERE t."timestamp" >= ${startOfToday}
      GROUP BY t."inverterId"
    ) sub
  `;

    return +(result[0]?.avg_output ?? 0).toFixed(1);
}

// 8 - Weekly energy output (last 7 days including today)
export async function weeklyEnergy() {
    // Adjust sevenDaysAgo to 6 days before today
    const startDate = new Date(sevenDaysAgo);
    startDate.setDate(startDate.getDate() - 6);

    const weeklyEnergyRaw: { day: string; date: string; energy_kw: number }[] =
        await prisma.$queryRaw`
      SELECT
        to_char(t."timestamp", 'Dy') AS day,
        to_char(t."timestamp", 'MM-DD') AS date,
        SUM(t."acOutputKw") AS energy_kw
      FROM "Telemetry" t
      WHERE t."timestamp" >= ${startDate}
      GROUP BY day, date
      ORDER BY MIN(t."timestamp")
    `;

    const weeklyEnergy = weeklyEnergyRaw.map(r => ({
        name: `${r.day} (${r.date})`,
        value: parseFloat(((r.energy_kw * MINUTES_PER_TELEMETRY) / 60).toFixed(2))
    }));

    return weeklyEnergy;
}

// day baseline average (kWh per day)
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

// 10 - output Deviation Status
export async function outputDeviationStatus() {
    const WARNING_DROP = 0.15;
    const CRITICAL_DROP = 0.25;

    // 7-day baseline (excluding today)
    const baselineRaw: { avg_output: number }[] =
        await prisma.$queryRaw`
      SELECT AVG(avg_output) AS avg_output
      FROM (
        SELECT
          t."inverterId",
          SUM(t."acOutputKw") / COUNT(*) AS avg_output
        FROM "Telemetry" t
        JOIN "Inverter" i ON t."inverterId" = i."id"
        WHERE t."timestamp" >= ${sevenDaysAgo}
          AND t."timestamp" < ${startOfToday}
        GROUP BY t."inverterId"
      ) sub
    `;

    const baseline = baselineRaw[0]?.avg_output ?? 0;

    // Current (today)
    const currentRaw: { avg_output: number }[] =
        await prisma.$queryRaw`
      SELECT AVG(avg_output) AS avg_output
      FROM (
        SELECT
          t."inverterId",
          SUM(t."acOutputKw") / COUNT(*) AS avg_output
        FROM "Telemetry" t
        JOIN "Inverter" i ON t."inverterId" = i."id"
        WHERE t."timestamp" >= ${startOfToday}
        GROUP BY t."inverterId"
      ) sub
    `;

    const current = currentRaw[0]?.avg_output ?? 0;

    // Deviation calculation
    const deviation =
        baseline === 0 ? 0 : (current - baseline) / baseline;

    let status: "good" | "warning" | "critical" = "good";

    if (deviation <= -CRITICAL_DROP) {
        status = "critical";
    } else if (deviation <= -WARNING_DROP) {
        status = "warning";
    }

    return status;
}