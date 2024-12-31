/*
  Warnings:

  - Added the required column `linked` to the `RecipeTags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeTags" ADD COLUMN     "linked" BOOLEAN NOT NULL;
