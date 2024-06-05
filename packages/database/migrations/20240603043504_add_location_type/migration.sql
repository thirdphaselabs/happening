/*
  Warnings:

  - Added the required column `type` to the `EventLocation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('VENUE', 'ONLINE');

-- AlterTable
ALTER TABLE "EventLocation" ADD COLUMN     "type" "LocationType" NOT NULL;
