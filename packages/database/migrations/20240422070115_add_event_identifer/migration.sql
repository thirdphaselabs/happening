/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_identifier_key" ON "Event"("identifier");
