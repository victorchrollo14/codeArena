/*
  Warnings:

  - You are about to drop the column `status` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the `CodeTemplate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubAuth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalAuth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodeTemplate" DROP CONSTRAINT "CodeTemplate_problemId_fkey";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubAuth" BOOLEAN NOT NULL,
ADD COLUMN     "normalAuth" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "CodeTemplate";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "CodeSnippets" (
    "id" SERIAL NOT NULL,
    "lang" "Language" NOT NULL,
    "code" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "CodeSnippets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "CodeSnippets" ADD CONSTRAINT "CodeSnippets_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
