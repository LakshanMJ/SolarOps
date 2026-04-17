import { prisma } from "../db/prisma.js";

const MINUTES_PER_TELEMETRY = 10

export async function energyProducedKwh(
    siteId: string,
    fromDate: Date,
    toDate: Date
) {
    const telemetrySum = await prisma.telemetry.aggregate({
        _sum: { acOutputKw: true },
        where: {
            inverter: {
                siteId: siteId
            },
            timestamp: {
                gte: fromDate,
                lte: toDate
            }
        }
    });

    const sumKw = telemetrySum._sum.acOutputKw ?? 0;

    return sumKw * (MINUTES_PER_TELEMETRY / 60);
}

export async function calculateDowntime(inverters: any[]): number {
    let total = 0;
    let downtime = 0;

    inverters.forEach((inv) => {
        inv.telemetry.forEach((t: any) => {
            if (t.irradiance > 50) {
                total++;
                if (t.acOutputKw === 0) {
                    downtime++;
                }
            }
        });
    });

    if (total === 0) return 0;

    return (downtime / total) * 100;
}

export async function calculateAlertRate(alerts, inverterCount) {
  return alerts / inverterCount;
}