// script to create sites and inverters with sample data for testing and development purposes

import { PrismaClient,InverterStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Sites...");

  // Seed Sites
  const sites = await prisma.site.createMany({
    data: [
      {
        name: "Solar Farm Alpha",
        latitude: 6.9271,
        longitude: 79.8612,
        region: "Colombo",
        peakCapacityMw: 50
      },
      {
        name: "Solar Farm Beta",
        latitude: 7.2906,
        longitude: 80.6337,
        region: "Kandy",
        peakCapacityMw: 30
      },
      {
        name: "Solar Farm Gamma",
        latitude: 8.5865,
        longitude: 81.2152,
        region: "Trincomalee",
        peakCapacityMw: 40
      }
    ]
  });

  console.log(`Created ${sites.count} Sites`);

  console.log("Seeding Inverters...");

  // Seed Inverters per Site
  const allSites = await prisma.site.findMany();

  for (const site of allSites) {
    const invertersData = [];

    for (let i = 1; i <= 5; i++) {
      invertersData.push({
        siteId: site.id,
        modelType: `INV-${i}`,
        capacityKw: Math.floor(Math.random() * 1000) + 500, // 500-1500 kW
        status: InverterStatus.Active,  // <-- use the enum
        installedAt: new Date(`2023-01-${i + 10}`),
      });
    }

    await prisma.inverter.createMany({
      data: invertersData
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
