import type { AlertSeverity } from '@prisma/client'
import { prisma } from '../db/prisma.js'

export async function createAlertIfNotExists(
  inverterId: string,
  message: string,
  severity: AlertSeverity
) {
  const existing = await prisma.alert.findFirst({
    where: {
      inverterId,
      message,
      resolved: false
    }
  })

  if (existing) return null

  return prisma.alert.create({
    data: {
      inverterId,
      message,
      severity
    }
  })
}
