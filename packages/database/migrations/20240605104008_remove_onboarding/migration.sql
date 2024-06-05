/*
  Warnings:

  - You are about to drop the `Onboarding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_profileId_fkey";

-- DropTable
DROP TABLE "Onboarding";
