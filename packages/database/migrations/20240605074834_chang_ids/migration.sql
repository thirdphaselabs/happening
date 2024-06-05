/*
  Warnings:

  - The primary key for the `EventDate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EventLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GuestList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GuestListAttendee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Onboarding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Organisation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ticketing` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_createdByProfileId_fkey";

-- DropForeignKey
ALTER TABLE "GuestListAttendee" DROP CONSTRAINT "GuestListAttendee_guestListId_fkey";

-- DropForeignKey
ALTER TABLE "GuestListAttendee" DROP CONSTRAINT "GuestListAttendee_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_organisationId_fkey";

-- DropIndex
DROP INDEX "Organisation_workosOrganisationId_idx";

-- AlterTable
ALTER TABLE "EventDate" DROP CONSTRAINT "EventDate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "EventDate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EventDate_id_seq";

-- AlterTable
ALTER TABLE "EventLocation" DROP CONSTRAINT "EventLocation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "EventLocation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EventLocation_id_seq";

-- AlterTable
ALTER TABLE "GuestList" DROP CONSTRAINT "GuestList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GuestList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GuestList_id_seq";

-- AlterTable
ALTER TABLE "GuestListAttendee" DROP CONSTRAINT "GuestListAttendee_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guestListId" SET DATA TYPE TEXT,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GuestListAttendee_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GuestListAttendee_id_seq";

-- AlterTable
ALTER TABLE "Onboarding" DROP CONSTRAINT "Onboarding_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Onboarding_id_seq";

-- AlterTable
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Organisation_id_seq";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "Ticketing" DROP CONSTRAINT "Ticketing_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ticketing_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ticketing_id_seq";

-- CreateIndex
CREATE INDEX "Organisation_id_idx" ON "Organisation"("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestListAttendee" ADD CONSTRAINT "GuestListAttendee_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestListAttendee" ADD CONSTRAINT "GuestListAttendee_guestListId_fkey" FOREIGN KEY ("guestListId") REFERENCES "GuestList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
