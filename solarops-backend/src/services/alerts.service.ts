import { prisma } from '../db/prisma.js';
import { emitNewAlert } from '../websocket.js';
import { AlertSeverity, AlertStatus } from '@prisma/client';

export async function createAlertIfNotExists(
  inverterId: string,
  message: string,
  severity: AlertSeverity
) {
  const existing = await prisma.alert.findFirst({
    where: {
      inverterId,
      message,
      status: AlertStatus.Open, // use enum, not string
    },
  });
  if (existing) return null;
  const alert = await prisma.alert.create({
    data: {
      inverterId,
      message,
      severity,
      status: AlertStatus.Open, // enum here too
    },
  });
  // Push alert to frontend in real-time
  emitNewAlert(alert);
  return alert;
}

export async function getAlertsService() {
  const alerts = await prisma.alert.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      inverter: {
        select: {
          name: true,
          site: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return alerts;
}

export async function updateAlertStatusService(
  id: string,
  status: AlertStatus
) {
  const alert = await prisma.alert.update({
    where: { id },
    data: { status },
  });
  return alert;
}
