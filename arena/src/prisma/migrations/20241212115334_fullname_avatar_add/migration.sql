-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "fullname" TEXT,
ALTER COLUMN "githubAuth" SET DEFAULT false,
ALTER COLUMN "normalAuth" SET DEFAULT true;
