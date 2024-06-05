-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('PROFILE', 'ORGANISATION', 'INVITE', 'COMPLETE', 'COMPLETED');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "onboardingStatus" "OnboardingStatus" NOT NULL DEFAULT 'PROFILE';
