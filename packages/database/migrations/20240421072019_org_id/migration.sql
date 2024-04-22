-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organisationId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "organisationId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("clerkOrganisationId") ON DELETE RESTRICT ON UPDATE CASCADE;
