/*
  Warnings:

  - You are about to drop the column `resolved` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `modelType` on the `Inverter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "resolved";

-- AlterTable
ALTER TABLE "Inverter" DROP COLUMN "modelType",
ADD COLUMN     "name" TEXT;
