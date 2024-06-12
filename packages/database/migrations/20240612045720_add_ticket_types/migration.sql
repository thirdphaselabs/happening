/*
  Warnings:

  - You are about to drop the column `type` on the `Ticketing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticketing" DROP COLUMN "type";

-- DropEnum
DROP TYPE "TicketType";

-- CreateTable
CREATE TABLE "TicketType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "availableQuantity" INTEGER,
    "salesStart" TIMESTAMP(3),
    "salesEnd" TIMESTAMP(3),
    "ticketingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketType" ADD CONSTRAINT "TicketType_ticketingId_fkey" FOREIGN KEY ("ticketingId") REFERENCES "Ticketing"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
