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
    // Update existing inverter
    return prisma.inverter.update({
      where: { id: payload.id },
      data: payload,
    });
  } else {
    // Create new inverter
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
      siteId: true,
      name: true,
      capacityKw: true,
      status: true,
      installedAt: true,
      alerts: { select: { id: true, status: true } },
      site: { select: { name: true } },
      telemetry: {
        select: { acOutputKw: true, tempC: true, timestamp: true },
      },
    },
  });

  // Map to frontend-friendly format
  const inverterData = inverters.map((inv) => {
    const latestTelemetry = inv.telemetry.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    )[0];

    // Calculate PR (%)
    let pr = 0;
    if (latestTelemetry) {
      pr = (latestTelemetry.acOutputKw / inv.capacityKw) * 100;
    }

    type Alert = { id: string; status: "Open" | "Acknowledged" | "Resolved" };

    const unresolvedAlerts = (inv.alerts as Alert[])
      .filter((alert) => alert.status !== "Resolved").length;

    return {
      id: inv.id,
      siteId: inv.siteId,
      name: inv.name,
      capacityKw: inv.capacityKw,
      status: inv.status,
      installedAt: inv.installedAt,
      alerts: unresolvedAlerts,
      site: inv.site.name,
      outputKw: latestTelemetry?.acOutputKw ?? 0,
      tempC: latestTelemetry?.tempC ?? 0,
      pr: +pr.toFixed(1),
      lastUpdate: latestTelemetry?.timestamp ?? null,
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
  // check existence first
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