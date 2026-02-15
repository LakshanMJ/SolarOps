// src/jobs/telemetryWorker.ts

import { PrismaClient, InverterStatus, AlertSeverity } from '@prisma/client'
import cron from 'node-cron'
import { evaluateTelemetry, TelemetryInput } from '../services/ruleEngine.service.js'

const prisma = new PrismaClient()

/* =========================================================
   UTILITIES
========================================================= */

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function simulateAcOutput(capacityKw: number, irradiance: number) {
  const noise = randomBetween(-0.05, 0.05) // ±5%
  return Math.max(0, capacityKw * (irradiance / 1000) * (1 + noise))
}

/* =========================================================
   STATUS RANKING
========================================================= */

const statusRank: Record<InverterStatus, number> = {
  [InverterStatus.Online]: 0,
  [InverterStatus.Degraded]: 1,
  [InverterStatus.Critical]: 2,
  [InverterStatus.Offline]: 3,
}

function isWorse(newStatus: InverterStatus, oldStatus: InverterStatus) {
  return statusRank[newStatus] > statusRank[oldStatus]
}

/* =========================================================
   RANDOM STATUS TRANSITIONS (SIMULATION)
========================================================= */

function randomStatusTransition(current: InverterStatus): InverterStatus {
  const roll = Math.random()

  switch (current) {
    case InverterStatus.Online:
      if (roll < 0.01) return InverterStatus.Critical   // 1%
      if (roll < 0.04) return InverterStatus.Degraded   // 3%
      return InverterStatus.Online

    case InverterStatus.Degraded:
      if (roll < 0.05) return InverterStatus.Critical
      if (roll < 0.20) return InverterStatus.Online
      return InverterStatus.Degraded

    case InverterStatus.Critical:
      if (roll < 0.05) return InverterStatus.Offline
      if (roll < 0.20) return InverterStatus.Degraded
      return InverterStatus.Critical

    case InverterStatus.Offline:
      if (roll < 0.20) return InverterStatus.Online
      return InverterStatus.Offline

    default:
      return InverterStatus.Online
  }
}

/* =========================================================
   TELEMETRY INGESTION
========================================================= */

async function ingestOnce() {
  console.log('⚡ Live telemetry tick:', new Date().toISOString())

  const inverters = await prisma.inverter.findMany()

  if (inverters.length === 0) {
    console.log('⚠️ No inverters found, skipping telemetry tick')
    return
  }

  // Align to 10-minute bucket
  const now = new Date()
  now.setSeconds(0, 0)
  now.setMilliseconds(0)
  now.setMinutes(Math.floor(now.getMinutes() / 10) * 10)

  const rows: TelemetryInput[] = inverters.map((inverter) => {
    const hour = now.getHours()

    let irradiance = 0
    let acOutput = 0
    let tempC = randomBetween(24, 80)

    if (hour >= 6 && hour <= 18) {
      irradiance = randomBetween(400, 1000)
      acOutput = simulateAcOutput(inverter.capacityKw, irradiance)
      tempC += (irradiance / 1000) * 6
    }

    const newStatus = randomStatusTransition(
      inverter.status || InverterStatus.Online
    )

    return {
      inverterId: inverter.id,
      timestamp: now,
      acOutputKw: Number(acOutput.toFixed(2)),
      tempC: Number(tempC.toFixed(1)),
      irradiance: Number(irradiance.toFixed(1)),
      status: newStatus,
    }
  })

  /* ---------------- INSERT TELEMETRY ---------------- */

  await prisma.telemetry.createMany({
    data: rows,
    skipDuplicates: true,
  })

  console.log(`✅ Inserted live telemetry for ${rows.length} inverters`)

  /* ---------------- STATUS UPDATE + ALERTS ---------------- */

  for (const telemetry of rows) {
    const current = inverters.find(i => i.id === telemetry.inverterId)
    if (!current || !telemetry.status) continue

    if (telemetry.status !== current.status) {

      // If downgraded → create alert
      if (isWorse(telemetry.status, current.status)) {
        await prisma.alert.create({
          data: {
            inverterId: current.id,
            severity:
              telemetry.status === InverterStatus.Critical ||
                telemetry.status === InverterStatus.Offline
                ? AlertSeverity.Critical
                : AlertSeverity.Warning,
            message: `Status changed from ${current.status} to ${telemetry.status}`,
          },
        })
      }

      // Update inverter snapshot status
      await prisma.inverter.update({
        where: { id: current.id },
        data: { status: telemetry.status },
      })
    }

    // Optional rule engine logic
    await evaluateTelemetry(telemetry)
  }
}

/* =========================================================
   CRON WORKER
========================================================= */

export default function startTelemetryWorker() {
  console.log('🚀 Starting telemetry worker (every 10 minutes)')

  // Run immediately
  ingestOnce().catch(console.error)

  // Then run every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    ingestOnce().catch(console.error)
  })
}
