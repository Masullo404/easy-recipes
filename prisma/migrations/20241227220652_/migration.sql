/*
  Warnings:

  - You are about to drop the column `liked` on the `favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "liked",
ADD COLUMN     "bookmarked" BOOLEAN NOT NULL DEFAULT true;
