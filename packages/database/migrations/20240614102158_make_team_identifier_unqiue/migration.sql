/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "identifier" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Team_identifier_key" ON "Team"("identifier");
