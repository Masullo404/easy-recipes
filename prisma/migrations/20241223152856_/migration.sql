/*
  Warnings:

  - The primary key for the `userView` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rcipeId` on the `userView` table. All the data in the column will be lost.
  - Added the required column `recipeId` to the `userView` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userView" DROP CONSTRAINT "userView_rcipeId_fkey";

-- AlterTable
ALTER TABLE "userView" DROP CONSTRAINT "userView_pkey",
DROP COLUMN "rcipeId",
ADD COLUMN     "recipeId" INTEGER NOT NULL,
ADD CONSTRAINT "userView_pkey" PRIMARY KEY ("recipeId", "userId");

-- AddForeignKey
ALTER TABLE "userView" ADD CONSTRAINT "userView_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
