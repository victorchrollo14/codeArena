/*
  Warnings:

  - The values [PYTHON,GO,JAVASCRIPT,TYPESCRIPT] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.
  - The values [EASY,MEDIUM,HARD] on the enum `Level` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('python', 'go', 'javascript', 'typescript');
ALTER TABLE "Submission" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TABLE "CodeSnippets" ALTER COLUMN "lang" TYPE "Language_new" USING ("lang"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Level_new" AS ENUM ('easy', 'medium', 'hard');
ALTER TABLE "Problem" ALTER COLUMN "level" TYPE "Level_new" USING ("level"::text::"Level_new");
ALTER TYPE "Level" RENAME TO "Level_old";
ALTER TYPE "Level_new" RENAME TO "Level";
DROP TYPE "Level_old";
COMMIT;
