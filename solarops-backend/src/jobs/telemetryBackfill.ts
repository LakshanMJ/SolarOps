import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function simulateAcOutput(capacityKw: number, irradiance: number) {
  const noise = randomBetween(-0.05, 0.05); // ±5%
  return Math.max(0, capacityKw * (irradiance / 1000) * (1 + noise));
}

async function main() {
  console.log("📦 Backfilling telemetry (last 7 days)...");

  const inverters = await prisma.inverter.findMany();

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 7);

  for (const inverter of inverters) {
    const telemetryBatch: any[] = [];
    const capacity = inverter.capacityKw;

    for (
      let d = new Date(startDate);
      d <= now;
      d.setMinutes(d.getMinutes() + 10)
    ) {
      const hour = d.getHours();

      let irradiance = 0;
      let acOutput = 0;
      let tempC = randomBetween(24, 32);

      // Daytime: 6 AM – 6 PM
      if (hour >= 6 && hour <= 18) {
        irradiance = randomBetween(400, 1000); // W/m²
        acOutput = simulateAcOutput(capacity, irradiance);
        tempC += (irradiance / 1000) * 6;
      }

      telemetryBatch.push({
        inverterId: inverter.id,
        timestamp: new Date(d),
        acOutputKw: Number(acOutput.toFixed(2)),
        tempC: Number(tempC.toFixed(1)),
        irradiance: Number(irradiance.toFixed(1)),
      });

      // Insert in chunks to avoid memory bloat
      if (telemetryBatch.length >= 500) {
        await prisma.telemetry.createMany({
          data: telemetryBatch,
          skipDuplicates: true,
        });
        telemetryBatch.length = 0;
      }
    }

    // Insert any remaining rows
    if (telemetryBatch.length > 0) {
      await prisma.telemetry.createMany({
        data: telemetryBatch,
        skipDuplicates: true,
      });
    }

    console.log(`✅ Backfilled inverter ${inverter.modelType}`);
  }

  console.log("🎉 Backfill complete.");
}

main()
  .catch((e) => {
    console.error("❌ Backfill failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
