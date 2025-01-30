/*
  Warnings:

  - Added the required column `birth_month` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "birth_month" INTEGER NOT NULL;
