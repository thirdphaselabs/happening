/*
  Warnings:

  - You are about to drop the column `address` on the `EventLocation` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `EventLocation` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `EventLocation` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `EventLocation` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `EventLocation` table. All the data in the column will be lost.
  - Added the required column `formattedAddress` to the `EventLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googlePlaceId` to the `EventLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `EventLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventLocation" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "postalCode",
DROP COLUMN "venue",
ADD COLUMN     "formattedAddress" TEXT NOT NULL,
ADD COLUMN     "googlePlaceId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
