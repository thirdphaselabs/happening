/*
  Warnings:

  - You are about to drop the column `onlineLocationLink` on the `EventLocation` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `EventLocation` table. All the data in the column will be lost.
  - Made the column `latitude` on table `EventLocation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `EventLocation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventLocation" DROP COLUMN "onlineLocationLink",
DROP COLUMN "type",
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;
