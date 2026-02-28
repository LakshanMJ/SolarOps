import { prisma } from '../db/prisma.js'

type Alert = { id: string; status: string }

function calculateSiteHealth(inverters: { status: string }[]) {
  if (!inverters.length) return 'Unknown'

  const weights: Record<string, number> = {
    Online: 1,
    Degraded: 0.6,
    Critical: 0.3,
    Offline: 0,
  }

  const totalScore = inverters.reduce((sum, inv) => sum + (weights[inv.status] ?? 0), 0)
  const score = totalScore / inverters.length

  if (score >= 0.85) return 'Good'
  if (score >= 0.6) return 'Warning'
  return 'Critical'
}

export async function getSitesService() {
  // Fetch all sites with inverters, telemetry, and alerts
  const sites = await prisma.site.findMany({
    where: {
      deletedAt: null, // ✅ hide soft-deleted records
    },
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

    // Compute health
    const health = calculateSiteHealth(site.inverters)

    return {
      id: site.id,
      name: site.name,
      location: site.region,
      lat: site.latitude,
      lng: site.longitude,
      capacity: site.peakCapacityMw,
      activeInverters,
      alerts: alertsCount,
      avgPR: +avgPR.toFixed(1),
      health
    }
  })

  return siteData
}

export async function deleteSiteService(siteId: string) {
  // check existence first
  const site = await prisma.site.findUnique({
    where: { id: siteId },
  });

  if (!site) {
    throw new Error("Site not found");
  }

  const now = new Date();

  // use transaction so both updates succeed or fail together
  await prisma.$transaction([
    // ✅ soft delete site
    prisma.site.update({
      where: { id: siteId },
      data: {
        deletedAt: now,
      },
    }),

    // ✅ soft delete ALL inverters under this site
    prisma.inverter.updateMany({
      where: { siteId: siteId },
      data: {
        deletedAt: now,
      },
    }),
  ]);

  return { message: "Site deleted successfully" };
}