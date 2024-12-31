/*
  Warnings:

  - You are about to drop the column `like` on the `like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "like" DROP COLUMN "like",
ADD COLUMN     "liked" BOOLEAN NOT NULL DEFAULT true;
