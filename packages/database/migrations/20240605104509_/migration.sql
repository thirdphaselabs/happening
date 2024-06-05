/*
  Warnings:

  - The values [ORGANISATION] on the enum `OnboardingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `organisationId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organisationId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnboardingStatus_new" AS ENUM ('PROFILE', 'TEAM', 'INVITE', 'COMPLETE', 'COMPLETED');
ALTER TABLE "Profile" ALTER COLUMN "onboardingStatus" DROP DEFAULT;
ALTER TABLE "Profile" ALTER COLUMN "onboardingStatus" TYPE "OnboardingStatus_new" USING ("onboardingStatus"::text::"OnboardingStatus_new");
ALTER TYPE "OnboardingStatus" RENAME TO "OnboardingStatus_old";
ALTER TYPE "OnboardingStatus_new" RENAME TO "OnboardingStatus";
DROP TYPE "OnboardingStatus_old";
ALTER TABLE "Profile" ALTER COLUMN "onboardingStatus" SET DEFAULT 'PROFILE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_organisationId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "organisationId",
ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "organisationId",
ADD COLUMN     "teamId" TEXT;

-- DropTable
DROP TABLE "Organisation";

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "workosOrganisationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "domain" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_workosOrganisationId_key" ON "Team"("workosOrganisationId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_domain_key" ON "Team"("domain");

-- CreateIndex
CREATE INDEX "Team_id_idx" ON "Team"("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
