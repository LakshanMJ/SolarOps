import { prisma } from '../db/prisma.js'

type Alert = { id: string; resolved: boolean }

export async function getInvertersService() {
  // Fetch all NON-DELETED inverters
  const inverters = await prisma.inverter.findMany({
    where: {
      deletedAt: null, // ✅ hide soft-deleted records
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

export async function createOrUpdateInverterService(payload: {
  id?: string // Added ID to the payload to check for existence
  name: string
  siteId: string
  manufacturerId?: string
  serialNumber?: string
  capacityKw: number
  image?: string | null
  status: 'Online' | 'Degraded' | 'Critical' | 'Offline'
  installedAt: Date
}) {
  return prisma.inverter.upsert({
    where: {
      // Use 'id' if you have it, or another unique field like 'serialNumber'
      id: payload.id || 'new-id'
    },
    update: payload, // Data to apply if the record exists
    create: payload  // Data to apply if the record is new
  })
}

export async function deleteInverterService(inverterId: string) {
  // check existence first
  const inverter = await prisma.inverter.findUnique({
    where: { id: inverterId },
  });

  if (!inverter) {
    throw new Error("Inverter not found");
  }

  // ✅ SOFT DELETE (instead of hard delete)
  await prisma.inverter.update({
    where: { id: inverterId },
    data: {
      deletedAt: new Date(),
    },
  });

  return { message: "Inverter deleted successfully" };
}