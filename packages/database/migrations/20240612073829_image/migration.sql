/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `Event` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "coverImageUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
