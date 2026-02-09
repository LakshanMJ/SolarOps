import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function simulateAcOutput(capacityKw: number, irradiance: number) {
    const noise = randomBetween(-0.05, 0.05); // ±5%
    return Math.max(0, capacityKw * (irradiance / 1000) * (1 + noise));
}

async function ingestOnce() {
    console.log("⚡ Live telemetry tick:", new Date().toISOString());

    const inverters = await prisma.inverter.findMany();
    if (inverters.length === 0) {
        console.log("⚠️ No inverters found, skipping telemetry tick");
        return;
    }

    // Align to 10-minute bucket
    const now = new Date();
    now.setSeconds(0, 0);
    now.setMilliseconds(0);
    now.setMinutes(Math.floor(now.getMinutes() / 10) * 10);

    const rows = inverters.map((inverter) => {
        const hour = now.getHours();

        let irradiance = 0;
        let acOutput = 0;
        let tempC = randomBetween(24, 32);

        if (hour >= 6 && hour <= 18) {
            irradiance = randomBetween(400, 1000);
            acOutput = simulateAcOutput(inverter.capacityKw, irradiance);
            tempC += (irradiance / 1000) * 6;
        }

        return {
            inverterId: inverter.id,
            timestamp: now,
            acOutputKw: Number(acOutput.toFixed(2)),
            tempC: Number(tempC.toFixed(1)),
            irradiance: Number(irradiance.toFixed(1)),
        };
    });

    await prisma.telemetry.createMany({
        data: rows,
        skipDuplicates: true,
    });

    console.log(`✅ Inserted live telemetry for ${rows.length} inverters`);
}

//Export using default for Node16 ESM friendly import
export default function startTelemetryWorker() {
    console.log("🚀 Starting telemetry worker (every 10 minutes)");

    // Run once immediately
    ingestOnce().catch(console.error);

    // Schedule every 10 minutes
    cron.schedule('*/10 * * * *', () => {
        ingestOnce().catch(console.error);
    });
}
