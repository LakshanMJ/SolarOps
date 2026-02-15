-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('Warning', 'Critical');

-- CreateEnum
CREATE TYPE "InverterStatus" AS ENUM ('Online', 'Degraded', 'Critical', 'Offline');

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "region" TEXT NOT NULL,
    "peakCapacityMw" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inverter" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "modelType" TEXT NOT NULL,
    "capacityKw" DOUBLE PRECISION NOT NULL,
    "status" "InverterStatus" NOT NULL,
    "installedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inverter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telemetry" (
    "id" BIGSERIAL NOT NULL,
    "inverterId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "acOutputKw" DOUBLE PRECISION NOT NULL,
    "tempC" DOUBLE PRECISION NOT NULL,
    "irradiance" DOUBLE PRECISION NOT NULL,
    "status" "InverterStatus",

    CONSTRAINT "Telemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "inverterId" TEXT NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Telemetry_timestamp_idx" ON "Telemetry"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Telemetry_inverterId_timestamp_key" ON "Telemetry"("inverterId", "timestamp");

-- AddForeignKey
ALTER TABLE "Inverter" ADD CONSTRAINT "Inverter_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telemetry" ADD CONSTRAINT "Telemetry_inverterId_fkey" FOREIGN KEY ("inverterId") REFERENCES "Inverter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_inverterId_fkey" FOREIGN KEY ("inverterId") REFERENCES "Inverter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
