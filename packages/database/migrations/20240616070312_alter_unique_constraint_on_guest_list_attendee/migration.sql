/*
  Warnings:

  - A unique constraint covering the columns `[profileId,guestListId]` on the table `GuestListAttendee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GuestListAttendee_profileId_key";

-- CreateIndex
CREATE UNIQUE INDEX "GuestListAttendee_profileId_guestListId_key" ON "GuestListAttendee"("profileId", "guestListId");
