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
