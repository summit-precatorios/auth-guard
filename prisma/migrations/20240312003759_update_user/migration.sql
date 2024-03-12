/*
  Warnings:

  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "verifiedEmail" DROP NOT NULL;

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "acronym" VARCHAR(15) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logicalExclusion" TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);
