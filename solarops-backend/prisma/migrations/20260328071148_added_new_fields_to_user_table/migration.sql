/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('email', 'sms', 'push', 'whatsapp');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
DROP COLUMN "title",
ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "employeeIdNumber" TEXT,
ADD COLUMN     "notificationChannels" "NotificationChannel"[] DEFAULT ARRAY['email']::"NotificationChannel"[],
ADD COLUMN     "onboardingDate" TIMESTAMP(3),
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_SiteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SiteToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SiteToUser_B_index" ON "_SiteToUser"("B");

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
