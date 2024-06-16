/*
  Warnings:

  - Added the required column `ticketTypeId` to the `GuestListAttendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuestListAttendee" ADD COLUMN     "ticketTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GuestListAttendee" ADD CONSTRAINT "GuestListAttendee_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
