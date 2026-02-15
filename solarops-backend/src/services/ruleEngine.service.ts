// src/services/ruleEngine.service.ts
import { prisma } from '../db/prisma.js'
import { InverterStatus } from '@prisma/client'
import { createAlertIfNotExists } from './alerts.service.js'

// Input type for telemetry BEFORE it has a DB id
export type TelemetryInput = {
  inverterId: string
  timestamp: Date
  acOutputKw: number
  tempC: number
  irradiance: number
  status?: InverterStatus | null
}

// Define severity order for "status worsening"
const statusSeverity: Record<InverterStatus, number> = {
  Online: 0,
  Degraded: 1,
  Critical: 2,
  Offline: 3,
}

export async function evaluateTelemetry(telemetry: TelemetryInput) {
  const { inverterId, tempC, acOutputKw, status, timestamp } = telemetry

  // RULE 1: Temperature > 75°C → Warning
  if (tempC > 75) {
    await createAlertIfNotExists(
      inverterId,
      'Temperature exceeded 75°C',
      'Warning'
    );
  } else {
    // Auto-resolve previously open temp alert
    const existingTempAlert = await prisma.alert.findFirst({
      where: {
        inverterId,
        message: 'Temperature exceeded 75°C',
        status: 'Open', // or AlertStatus.Open if using enum
      },
    });

    if (existingTempAlert) {
      await prisma.alert.update({
        where: { id: existingTempAlert.id },
        data: { status: 'Resolved' }, // or AlertStatus.Resolved
      });
    }
  }

  // RULE 2: Status worsening

  if (status) {
    const previous = await prisma.telemetry.findFirst({
      where: {
        inverterId,
        timestamp: { lt: timestamp },
      },
      orderBy: { timestamp: 'desc' },
    })
    if (status && previous && previous.status) {
      const prevLevel = statusSeverity[previous.status];
      const currLevel = statusSeverity[status];

      if (currLevel > prevLevel) {
        await createAlertIfNotExists(
          inverterId,
          `Inverter status worsened from ${previous.status} to ${status}`,
          'Critical'
        );
      } else if (currLevel < prevLevel) {
        // Status improved → resolve existing alert
        const existingStatusAlert = await prisma.alert.findFirst({
          where: {
            inverterId,
            message: { contains: 'Inverter status worsened' },
            status: 'Open',
          },
        });

        if (existingStatusAlert) {
          await prisma.alert.update({
            where: { id: existingStatusAlert.id },
            data: { status: 'Resolved' },
          });
        }
      }
    }
  }

  // -------------------------
  // RULE 3: AC output drop > 40% in 10 minutes
  // -------------------------
  const tenMinutesAgo = new Date(timestamp.getTime() - 10 * 60 * 1000)
  const tenMinPrevious = await prisma.telemetry.findFirst({
    where: { inverterId, timestamp: { lte: tenMinutesAgo } },
    orderBy: { timestamp: 'desc' },
  })

  if (tenMinPrevious && tenMinPrevious.acOutputKw > 0) {
    const drop = ((tenMinPrevious.acOutputKw - acOutputKw) / tenMinPrevious.acOutputKw) * 100
    if (drop > 40) {
      await createAlertIfNotExists(
        inverterId,
        'AC output dropped more than 40% in 10 minutes',
        'Critical'
      );
    } else {
      const existingDropAlert = await prisma.alert.findFirst({
        where: {
          inverterId,
          message: 'AC output dropped more than 40% in 10 minutes',
          status: 'Open',
        },
      });

      if (existingDropAlert) {
        await prisma.alert.update({
          where: { id: existingDropAlert.id },
          data: { status: 'Resolved' },
        });
      }
    }
  }
}
