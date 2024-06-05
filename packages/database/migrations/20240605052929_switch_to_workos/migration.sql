/*
  Warnings:

  - You are about to drop the column `createdByUserId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GuestListAttendee` table. All the data in the column will be lost.
  - You are about to drop the column `userRole` on the `Onboarding` table. All the data in the column will be lost.
  - You are about to drop the column `clerkOrganisationId` on the `Organisation` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `GuestListAttendee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workosOrganisationId]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdByProfileId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `GuestListAttendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workosOrganisationId` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProfileRole" AS ENUM ('PLAVENTI_ADMIN', 'ORGANIZER_ADMIN', 'ORGANIZER', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "GuestListAttendee" DROP CONSTRAINT "GuestListAttendee_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organisationId_fkey";

-- DropIndex
DROP INDEX "GuestListAttendee_userId_key";

-- DropIndex
DROP INDEX "Organisation_clerkOrganisationId_idx";

-- DropIndex
DROP INDEX "Organisation_clerkOrganisationId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdByUserId",
ADD COLUMN     "createdByProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GuestListAttendee" DROP COLUMN "userId",
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Onboarding" DROP COLUMN "userRole",
ADD COLUMN     "profileRole" "ProfileRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "clerkOrganisationId",
ADD COLUMN     "workosOrganisationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userRole" "ProfileRole" NOT NULL,
    "workosId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_workosId_key" ON "Profile"("workosId");

-- CreateIndex
CREATE INDEX "Profile_workosId_idx" ON "Profile"("workosId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestListAttendee_profileId_key" ON "GuestListAttendee"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_workosOrganisationId_key" ON "Organisation"("workosOrganisationId");

-- CreateIndex
CREATE INDEX "Organisation_workosOrganisationId_idx" ON "Organisation"("workosOrganisationId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("workosOrganisationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES "Profile"("workosId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("workosOrganisationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestListAttendee" ADD CONSTRAINT "GuestListAttendee_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
