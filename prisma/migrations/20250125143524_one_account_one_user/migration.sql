/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "auth"."account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "auth"."account" DROP COLUMN "providerAccountId",
ADD COLUMN     "provider_account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "auth"."account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "auth"."account"("provider", "provider_account_id");
