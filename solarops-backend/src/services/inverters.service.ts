import { prisma } from '../db/prisma.js'

export async function createOrUpdateInverterService(payload: {
    id?: string;
    name: string;
    siteId: string;
    manufacturerId?: string;
    serialNumber?: string;
    capacityKw: number;
    image?: string | null;
    status: 'Online' | 'Degraded' | 'Critical' | 'Offline';
    installedAt: Date;
}) {
    if (payload.id) {
        return prisma.inverter.update({
            where: { id: payload.id },
            data: payload,
        });
    } else {
        return prisma.inverter.create({
            data: payload,
        });
    }
}

export async function getInvertersService() {
    const inverters = await prisma.inverter.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            status: true,
            siteId: true,
            site: {
                select: {
                    name: true
                }
            },
            manufacturerId: true,
            manufacturer: {
                select: {
                    id: true,
                    name: true,
                }
            },
            serialNumber: true,
            model: true,
            firmwareVersion: true,
            capacityKw: true,
            installedAt: true,
            image: true,
            alerts: { select: { id: true, status: true } },
            telemetry: {
                select: { acOutputKw: true, tempC: true, timestamp: true },
            },
        },
    });

    const inverterData = inverters.map((inv) => {
        const latestTelemetry = inv.telemetry.sort(
            (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        )[0];

        let capacityUtilization = 0;
        if (latestTelemetry) {
            capacityUtilization = (latestTelemetry.acOutputKw / inv.capacityKw) * 100;
        }

        type Alert = { id: string; status: "Open" | "Acknowledged" | "Resolved" };

        const unresolvedAlerts = (inv.alerts as Alert[])
            .filter((alert) => alert.status !== "Resolved").length;

        return {
            id: inv.id,
            name: inv.name,
            status: inv.status,
            siteId: inv.siteId,
            siteName: inv.site?.name || "Unknown Site",
            manufacturerName: inv.manufacturer?.name || "Unknown",
            manufacturerId: inv.manufacturerId,
            serialNumber: inv.serialNumber,
            model: inv.model,
            firmwareVersion: inv.firmwareVersion,
            capacityKw: inv.capacityKw,
            installedAt: inv.installedAt,
            alerts: unresolvedAlerts,
            outputKw: latestTelemetry?.acOutputKw ?? 0,
            tempC: latestTelemetry?.tempC ?? 0,
            capacityUtilization: +capacityUtilization.toFixed(1),
            lastUpdate: latestTelemetry?.timestamp ?? null,
            image: inv.image,
        };
    });

    return inverterData;
}

export async function getInverterByIdService(id: string) {
    const inverter = await prisma.inverter.findUnique({
        where: { id },
        include: {
            site: true,
            manufacturer: true,
        },
    });
    if (!inverter) {
        throw new Error("INVERTER_NOT_FOUND");
    }
    return inverter;
}

export async function deleteInverterService(inverterId: string) {
    const inverter = await prisma.inverter.findUnique({
        where: { id: inverterId },
    });

    if (!inverter) {
        throw new Error("Inverter not found");
    }

    await prisma.inverter.update({
        where: { id: inverterId },
        data: {
            deletedAt: new Date(),
        },
    });

    return { message: "Inverter deleted successfully" };
}