/*
  Warnings:

  - You are about to drop the column `startTime` on the `EventDate` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `EventDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeZone` to the `EventDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventDate" DROP COLUMN "startTime",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timeZone" TEXT NOT NULL;
