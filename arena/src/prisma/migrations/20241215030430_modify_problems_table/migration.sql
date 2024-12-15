/*
  Warnings:

  - You are about to drop the column `timeLimit` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `compileTimeOut` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runTimeOut` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "timeLimit",
ADD COLUMN     "compileTimeOut" INTEGER NOT NULL,
ADD COLUMN     "expectedAnswer" TEXT[],
ADD COLUMN     "runTimeOut" INTEGER NOT NULL,
ALTER COLUMN "testCases" SET DATA TYPE TEXT[];
