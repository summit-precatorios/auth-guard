-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "type" VARCHAR(10) NOT NULL,
    "ownerFullName" VARCHAR(255) NOT NULL,
    "ownerDocument" VARCHAR(14) NOT NULL,
    "lawSuit" VARCHAR(75) NOT NULL,
    "court" VARCHAR(75) NOT NULL,
    "origin" VARCHAR(75) NOT NULL,
    "price" DECIMAL(9,2) NOT NULL,
    "salePrice" DECIMAL(9,2) NOT NULL,
    "liquidBalance" DECIMAL(9,2) NOT NULL,
    "paymentOption" VARCHAR(13) NOT NULL,
    "pixKey" VARCHAR(500),
    "ownerBankAccount" VARCHAR(10),
    "documentBankAccount" VARCHAR(14),
    "bankAccount" VARCHAR(10),
    "agencyBankAccount" VARCHAR(10),
    "userId" TEXT,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
