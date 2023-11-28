/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(44)`.
  - You are about to alter the column `passwordSalt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(12)`.

*/
-- AlterTable
ALTER TABLE "Completion" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "JournalPost" ALTER COLUMN "date" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE CHAR(44),
ALTER COLUMN "passwordSalt" SET DATA TYPE CHAR(12);
