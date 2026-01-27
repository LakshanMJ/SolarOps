import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function simulateAcOutput(capacityKw: number, irradiance: number) {
  // Max AC output = capacity × (irradiance / 1000) + small random noise
  const noise = randomBetween(-0.05, 0.05); // ±5%
  return Math.max(0, capacityKw * (irradiance / 1000) * (1 + noise));
}

async function main() {
  console.log("Generating telemetry...");

  const inverters = await prisma.inverter.findMany();

  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 7); // 7 days ago

  for (const inverter of inverters) {
    const telemetryData = [];
    const capacity = inverter.capacityKw;

    for (let d = new Date(startDate); d <= now; d.setMinutes(d.getMinutes() + 10)) {
      const hour = d.getHours();

      let irradiance = 0;
      let acOutput = 0;
      let tempC = randomBetween(25, 35);

      // Daytime: 6 AM – 6 PM
      if (hour >= 6 && hour <= 18) {
        irradiance = randomBetween(400, 1000); // W/m²
        acOutput = simulateAcOutput(capacity, irradiance);
        tempC += (irradiance / 1000) * 5; // hotter if sunny
      }

      telemetryData.push({
        inverterId: inverter.id,
        timestamp: new Date(d),
        acOutputKw: parseFloat(acOutput.toFixed(2)),
        tempC: parseFloat(tempC.toFixed(1)),
        irradiance: parseFloat(irradiance.toFixed(1)),
      });

      // Insert in chunks of 200 to avoid huge arrays
      if (telemetryData.length >= 200) {
        await prisma.telemetry.createMany({ data: telemetryData });
        telemetryData.length = 0;
      }
    }

    // Insert remaining
    if (telemetryData.length > 0) {
      await prisma.telemetry.createMany({ data: telemetryData });
    }

    console.log(`Telemetry generated for inverter ${inverter.modelType}`);
  }

  console.log("Telemetry generation complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
