import { prisma } from '../db/prisma.js'

type Alert = { id: string; resolved: boolean }

export async function getInvertersService() {
  // Fetch all inverters with site, telemetry, and alerts
  const inverters = await prisma.inverter.findMany({
    select: {
      id: true,
      status: true,
      capacityKw: true,
      site: { select: { name: true } },
      telemetry: {
        select: { acOutputKw: true, tempC: true, timestamp: true }
      },
      alerts: { select: { id: true, resolved: true } }
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

    const unresolvedAlerts = (inv.alerts as Alert[]).filter(alert => !alert.resolved).length

    return {
      id: inv.id,
      site: inv.site.name,
      status: inv.status,
      outputKw: latestTelemetry?.acOutputKw ?? 0,
      tempC: latestTelemetry?.tempC ?? 0,
      pr: +pr.toFixed(1),
      alerts: unresolvedAlerts,
      lastUpdate: latestTelemetry?.timestamp ?? null
    }
  })

  return inverterData
}
