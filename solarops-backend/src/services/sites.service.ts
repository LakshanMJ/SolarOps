import { prisma } from '../db/prisma.js'
import activeInverterCount from '../utils/activeInverterCount.js'
import calculateAveragePRPerSite from '../utils/calculateAveragePRPerSite.js'
import calculateSiteHealth from '../utils/calculateSiteHealth.js'
import unresolvedAlertsCount from '../utils/unresolvedAlertsCount.js'

export async function createSiteService(data) {
  const { name, latitude, longitude, region, peakCapacityMw } = data;

  if (!name || latitude == null || longitude == null || !region || !peakCapacityMw) {
    throw new Error("VALIDATION_ERROR");
  }

  const newSite = await prisma.site.create({
    data: {
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      region,
      peakCapacityMw: parseFloat(peakCapacityMw),
    },
  });

  return newSite;
}

export async function getSitesService() {
  const sites = await prisma.site.findMany({
    where: {
      deletedAt: null,
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

  const siteData = sites.map(site => {

    const activeInverters = activeInverterCount(site.inverters);

    const alertsCount = unresolvedAlertsCount(site.inverters);

    const avgPR = calculateAveragePRPerSite(site.inverters);

    const health = calculateSiteHealth(site.inverters);

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

export async function getSiteByIdService(id: string) {
  const site = await prisma.site.findUnique({
    where: { id },
  });

  if (!site) {
    throw new Error("SITE_NOT_FOUND");
  }

  return site;
}

export async function updateSiteService(id: string, data: any) {
  const { name, latitude, longitude, region, peakCapacityMw } = data;

  // Simple validation: at least one field must be provided
  if (
    name === undefined &&
    latitude === undefined &&
    longitude === undefined &&
    region === undefined &&
    peakCapacityMw === undefined
  ) {
    throw new Error("VALIDATION_ERROR");
  }

  // Check if site exists first
  const existingSite = await prisma.site.findUnique({
    where: { id },
  });

  if (!existingSite) {
    return null; // Controller will handle 404
  }

  // Update site
  const updatedSite = await prisma.site.update({
    where: { id },
    data: {
      name: name ?? existingSite.name,
      latitude: latitude !== undefined ? parseFloat(latitude) : existingSite.latitude,
      longitude: longitude !== undefined ? parseFloat(longitude) : existingSite.longitude,
      region: region ?? existingSite.region,
      peakCapacityMw: peakCapacityMw !== undefined ? parseFloat(peakCapacityMw) : existingSite.peakCapacityMw,
    },
  });

  return updatedSite;
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