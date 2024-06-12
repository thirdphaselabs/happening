-- DropForeignKey
ALTER TABLE "EventDate" DROP CONSTRAINT "EventDate_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventLocation" DROP CONSTRAINT "EventLocation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "GuestList" DROP CONSTRAINT "GuestList_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ticketing" DROP CONSTRAINT "Ticketing_eventId_fkey";

-- AddForeignKey
ALTER TABLE "EventLocation" ADD CONSTRAINT "EventLocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDate" ADD CONSTRAINT "EventDate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticketing" ADD CONSTRAINT "Ticketing_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestList" ADD CONSTRAINT "GuestList_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
