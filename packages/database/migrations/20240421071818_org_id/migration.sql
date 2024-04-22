-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organisationId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "organisationId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "Organisation_clerkOrganisationId_idx" ON "Organisation"("clerkOrganisationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("clerkOrganisationId") ON DELETE RESTRICT ON UPDATE CASCADE;
