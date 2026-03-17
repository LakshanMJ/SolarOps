import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AlertsQuery {
  status?: string;
  severity?: string;
  siteId?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
}

export const getAlertsData = async (query: AlertsQuery) => {
  const {
    status,
    severity,
    siteId,
    fromDate,
    toDate,
    limit = 1000,
    offset = 0,
  } = query;

  const where: any = {};

  if (status) where.status = status;
  if (severity) where.severity = severity;

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt.gte = new Date(fromDate);
    if (toDate) where.createdAt.lte = new Date(toDate);
  }

  if (siteId) {
    where.inverter = {
      siteId: siteId
    };
  }

  const alerts = await prisma.alert.findMany({
    where,
    include: {
      inverter: {
        select: {
          id: true,
          name: true,
          site: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });

  return alerts.map((a) => ({
    id: a.id,
    message: a.message,
    severity: a.severity,
    status: a.status,
    createdAt: a.createdAt,
    inverterId: a.inverter.id,
    inverterName: a.inverter.name,
    siteId: a.inverter.site.id,
    siteName: a.inverter.site.name,
  }));
};