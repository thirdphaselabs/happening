/*
  Warnings:

  - You are about to drop the column `timeZone` on the `EventDate` table. All the data in the column will be lost.
  - Added the required column `timezone` to the `EventDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventDate" DROP COLUMN "timeZone",
ADD COLUMN     "timezone" TEXT NOT NULL;
