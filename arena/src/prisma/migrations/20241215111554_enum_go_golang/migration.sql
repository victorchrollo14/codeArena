/*
  Warnings:

  - The values [go] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('python', 'golang', 'javascript', 'typescript');
ALTER TABLE "Submission" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TABLE "CodeSnippets" ALTER COLUMN "lang" TYPE "Language_new" USING ("lang"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;
