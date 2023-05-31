-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('BACKLOG', 'TODO', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'BACKLOG';
