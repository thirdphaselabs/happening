/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Onboarding` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workosUserId]` on the table `Onboarding` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workosUserId` to the `Onboarding` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Onboarding_clerkId_key";

-- AlterTable
ALTER TABLE "Onboarding" DROP COLUMN "clerkId",
ADD COLUMN     "workosUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Onboarding_workosUserId_key" ON "Onboarding"("workosUserId");
