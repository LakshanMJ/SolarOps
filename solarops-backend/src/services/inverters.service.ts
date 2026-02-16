import { prisma } from '../db/prisma.js'

type Alert = { id: string; resolved: boolean }

export async function getInvertersService() {
  // Fetch all inverters with site, telemetry, and alerts
  const inverters = await prisma.inverter.findMany({
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
        select: { acOutputKw: true, tempC: true, timestamp: true }
      },
    }
  })

  // Map to frontend-friendly format
  const inverterData = inverters.map(inv => {
    const latestTelemetry = inv.telemetry.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    )[0]

    // Calculate PR (%) for inverter
    let pr = 0
    if (latestTelemetry) {
      pr = (latestTelemetry.acOutputKw / inv.capacityKw) * 100
    }

    type Alert = { id: string; status: 'Open' | 'Acknowledged' | 'Resolved' }

    const unresolvedAlerts = (inv.alerts as Alert[])
      .filter(alert => alert.status !== 'Resolved').length

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
      lastUpdate: latestTelemetry?.timestamp ?? null
    }
  })

  return inverterData
}
