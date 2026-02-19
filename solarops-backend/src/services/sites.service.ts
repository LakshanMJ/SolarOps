import { prisma } from '../db/prisma.js'

type Alert = { id: string; status: string }

export async function getSitesService() {
  // Fetch all sites with inverters, telemetry, and alerts
  const sites = await prisma.site.findMany({
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
      region: true,
      peakCapacityMw: true,
      inverters: {
        select: {
          id: true,
          status: true,
          telemetry: {
            select: { acOutputKw: true }
          },
          alerts: {
            select: { id: true, status: true }
          }
        }
      }
    }
  })

  // Map into frontend-friendly structure
  const siteData = sites.map(site => {
    const activeInverters = site.inverters.filter(inv => inv.status === 'Online').length

    // Count all unresolved alerts from all inverters in this site
    const alertsCount = site.inverters
      .flatMap(inv => inv.alerts)
      .filter(alert => alert.status !== 'Resolved').length

    // Calculate avg PR per site
    let avgPR = 0
    if (site.inverters.length > 0) {
      const inverterPRs = site.inverters.map(inv => {
        if (!inv.telemetry || inv.telemetry.length === 0) return 0
        const sumOutput = inv.telemetry.reduce((sum, t) => sum + t.acOutputKw, 0)
        return (sumOutput / inv.telemetry.length) * (inv.status === 'Online' ? 1 : 0)
      })
      avgPR = inverterPRs.reduce((a, b) => a + b, 0) / inverterPRs.length
    }

    return {
      id: site.id,
      name: site.name,
      location: site.region,
      lat: site.latitude,
      lng: site.longitude,
      capacity: site.peakCapacityMw,
      activeInverters,
      alerts: alertsCount,
      avgPR: +avgPR.toFixed(1)
    }
  })

  return siteData
}
