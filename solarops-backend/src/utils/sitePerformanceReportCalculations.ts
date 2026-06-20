import { prisma } from "../db/prisma.js";

const MINUTES_PER_TELEMETRY = 10;

interface Telemetry {
    acOutputKw: number;
    irradiance: number;
}

interface Inverter {
    telemetry: Telemetry[];
}

interface Alert {
    id: string;
    status: string;
}

export async function energyProducedKwh(
    siteId: string,
    fromDate: Date,
    toDate: Date
): Promise<number> {
    const telemetrySum = await prisma.telemetry.aggregate({
        _sum: { acOutputKw: true },
        where: {
            inverter: {
                siteId: siteId,
            },
            timestamp: {
                gte: fromDate,
                lte: toDate,
            },
        },
    });

    const sumKw = telemetrySum._sum.acOutputKw ?? 0;

    return sumKw * (MINUTES_PER_TELEMETRY / 60);
}

export async function calculateDowntime(
    inverters: Inverter[]
): Promise<number> {
    let total = 0;
    let downtime = 0;

    inverters.forEach((inv) => {
        inv.telemetry.forEach((t) => {
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

export async function calculateAlertRate(
    alerts: number,
    inverterCount: number
): Promise<number> {
    if (inverterCount === 0) return 0;
    return alerts / inverterCount;
}