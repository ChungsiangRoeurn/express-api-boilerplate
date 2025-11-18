-- AlterTable
ALTER TABLE "user" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
