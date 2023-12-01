/*
  Warnings:

  - You are about to drop the column `userId` on the `ToDo` table. All the data in the column will be lost.
  - Added the required column `priority` to the `ToDo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_userId_fkey";

-- AlterTable
ALTER TABLE "ToDo" DROP COLUMN "userId",
ADD COLUMN     "priority" SMALLINT NOT NULL,
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastCompletion" DATE,
ADD COLUMN     "lastJournal" DATE;

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
