/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Onboarding` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Onboarding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Onboarding" ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_profileId_key" ON "Onboarding"("profileId");

-- AddForeignKey
ALTER TABLE "Onboarding" ADD CONSTRAINT "Onboarding_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
