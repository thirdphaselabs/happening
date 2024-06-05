/*
  Warnings:

  - The values [COMPLETE] on the enum `OnboardingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnboardingStatus_new" AS ENUM ('PROFILE', 'TEAM', 'INVITE', 'COMPLETED');
ALTER TABLE "Profile" ALTER COLUMN "onboardingStatus" DROP DEFAULT;
ALTER TABLE "Profile" ALTER COLUMN "onboardingStatus" TYPE "OnboardingStatus_new" USING ("onboardingStatus"::text::"OnboardingStatus_new");
ALTER TYPE "OnboardingStatus" RENAME TO "OnboardingStatus_old";
ALTER TYPE "OnboardingStatus_new" RENAME TO "OnboardingStatus";
DROP TYPE "OnboardingStatus_old";
ALTER TABLE "Profile" ALTER COLUMN "onboardingStatus" SET DEFAULT 'PROFILE';
COMMIT;
