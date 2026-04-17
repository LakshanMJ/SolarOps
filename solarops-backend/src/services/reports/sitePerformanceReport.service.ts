import type { $Enums } from "@prisma/client";
import activeInverterCount from "../../utils/activeInverterCount.js";
import calculateAveragePRPerSite from "../../utils/calculateAvgInverterPowerKwPerSite.js";
import calculateSiteHealth from "../../utils/calculateSiteHealth.js";
import unresolvedAlertsCount from "../../utils/unresolvedAlertsCount.js";
import { calculateAlertRate, calculateDowntime, energyProducedKwh } from "../../utils/sitePerformanceReportCalculations.js";
import { prisma } from "../../db/prisma.js";

export async function getSitePerformanceData(query: any) {
    const { siteId, fromDate, toDate } = query;

    if (!siteId) throw new Error("SITE_ID_REQUIRED");

    const site = await prisma.site.findUnique({
        where: { id: siteId },
        select: {
            id: true,
            name: true,
            region: true,
            peakCapacityMw: true,

            inverters: {
                select: {
                    id: true,
                    status: true,

                    telemetry: {
                        where: {
                            timestamp: {
                                gte: fromDate ? new Date(fromDate) : undefined,
                                lte: toDate ? new Date(toDate) : undefined,
                            },
                        },
                        select: {
                            acOutputKw: true,
                            irradiance: true,
                        },
                    },

                    alerts: {
                        where: {
                            createdAt: {
                                gte: fromDate ? new Date(fromDate) : undefined,
                                lte: toDate ? new Date(toDate) : undefined,
                            },
                        },
                        select: {
                            id: true,
                            status: true,
                        },
                    },
                },
            },
        },
    });

    if (!site) throw new Error("SITE_NOT_FOUND");

    const activeInverters = activeInverterCount(site.inverters);
    const alertsCount = unresolvedAlertsCount(site.inverters);
    const avgPR = calculateAveragePRPerSite(site.inverters);
    const health = calculateSiteHealth(site.inverters);

    const avgOutput =
        site.inverters
            .flatMap((inv) => inv.telemetry)
            .reduce((sum, t) => sum + (t.acOutputKw || 0), 0) /
        (site.inverters.flatMap((inv) => inv.telemetry).length || 1);

    const energyProduced = await energyProducedKwh(
        siteId,
        new Date(fromDate),
        new Date(toDate)
    );

    const downtime = await calculateDowntime(site.inverters);

    const alertRate = await calculateAlertRate(alertsCount, activeInverters);

    return {
        siteName: site.name,
        region: site.region,
        capacityMw: site.peakCapacityMw,
        totalInverters: site.inverters.length,

        activeInverters,
        alertsCount,
        avgOutputKw: +avgOutput.toFixed(2),
        avgPR: +avgPR.toFixed(1),
        health,

        energyProducedKwh: +energyProduced.toFixed(2),
        downtimePercent: +downtime.toFixed(2),
        alertRate: Number(alertRate.toFixed(2)),
    };
}