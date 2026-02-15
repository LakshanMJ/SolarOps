-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('Open', 'Acknowledged', 'Resolved');

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "status" "AlertStatus" NOT NULL DEFAULT 'Open';
