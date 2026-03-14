import { AlertSeverity, AlertStatus, InverterStatus, SiteHealth } from "@prisma/client";

export const getMetadata = () => {
  return {
    alertSeverity: Object.values(AlertSeverity),
    alertStatus: Object.values(AlertStatus),
    inverterStatus: Object.values(InverterStatus),
    siteHealth: Object.values(SiteHealth),
  };
};