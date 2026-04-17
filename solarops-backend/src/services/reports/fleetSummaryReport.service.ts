import { PrismaClient, AlertStatus, InverterStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFleetSummaryData(query: any) {
    const fromDate = query.fromDate ? new Date(query.fromDate) : new Date();
    const toDate = query.toDate ? new Date(query.toDate) : new Date();

    // Total Sites
    const totalSites = await prisma.site.count({
        where: { deletedAt: null }
    });

    // Total Inverters
    const totalInverters = await prisma.inverter.count({
        where: { deletedAt: null }
    });

    // Active Alerts (time-bound + open)
    const activeAlerts = await prisma.alert.count({
        where: {
            status: AlertStatus.Open,
            createdAt: {
                gte: fromDate,
                lte: toDate
            }
        }
    });

    // Online / Offline Inverters
    const online = await prisma.inverter.count({
        where: {
            status: InverterStatus.Online,
            deletedAt: null
        }
    });

    const offline = await prisma.inverter.count({
        where: {
            NOT: { status: InverterStatus.Online },
            deletedAt: null
        }
    });

    // Total Output (time-based)
    const outputAgg = await prisma.telemetry.aggregate({
        where: {
            timestamp: { gte: fromDate, lte: toDate }
        },
        _sum: { acOutputKw: true }
    });
    const totalOutput = outputAgg._sum.acOutputKw ?? 0;

    // Average PR (time-based)
    // Simplified PR = Total Output / Total Capacity of all inverters
    const inverterCapacity = await prisma.inverter.aggregate({
        _sum: { capacityKw: true }
    });
    const totalCapacity = inverterCapacity._sum.capacityKw ?? 0;

    const avgPR = totalCapacity > 0 ? (totalOutput / totalCapacity) * 100 : 0;

    return {
        totalSites,
        totalInverters,
        onlineInverters: online,
        offlineInverters: offline,
        activeAlerts,
        totalOutput,
        averagePR: Number(avgPR.toFixed(2))
    };
}