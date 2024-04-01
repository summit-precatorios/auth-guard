/*
  Warnings:

  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" VARCHAR(150) NOT NULL;
