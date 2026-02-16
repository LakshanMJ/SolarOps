/*
  Warnings:

  - Made the column `name` on table `Inverter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Inverter" ALTER COLUMN "name" SET NOT NULL;
