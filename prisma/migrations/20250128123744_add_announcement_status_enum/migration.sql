-- CreateEnum
CREATE TYPE "public"."AnnouncementStatus" AS ENUM ('APROVED', 'PENDENT', 'REPROVED');

-- AlterTable
ALTER TABLE "public"."announcement" ADD COLUMN     "status" "public"."AnnouncementStatus" NOT NULL DEFAULT 'PENDENT';
