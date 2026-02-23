-- AlterTable
ALTER TABLE "Inverter" ADD COLUMN     "manufacturerId" TEXT;

-- CreateTable
CREATE TABLE "InverterManufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "website" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InverterManufacturer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "InverterManufacturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
