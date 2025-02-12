/*
  Warnings:

  - You are about to drop the column `birth_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `birth_month` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "birth_date",
DROP COLUMN "birth_month",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "birthMonth" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
