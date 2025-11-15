-- CreateEnum
CREATE TYPE "public"."AnnouncementStatus" AS ENUM ('APROVED', 'PENDENT', 'REPROVED');

-- CreateTable
CREATE TABLE "auth"."account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "expiresAt" INTEGER,
    "tokenType" TEXT,
    "scope" TEXT,
    "idToken" TEXT,
    "sessionState" TEXT,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuer" VARCHAR(75) NOT NULL
);

-- CreateTable
CREATE TABLE "auth"."role" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" VARCHAR(15) NOT NULL,
    "description" VARCHAR(75),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."announcement" (
    "id" TEXT NOT NULL,
    "title" VARCHAR,
    "type" VARCHAR NOT NULL,
    "ownerFullName" VARCHAR NOT NULL,
    "ownerDocument" VARCHAR NOT NULL,
    "lawSuit" VARCHAR NOT NULL,
    "court" VARCHAR NOT NULL,
    "origin" VARCHAR NOT NULL,
    "price" DECIMAL NOT NULL,
    "salePrice" DECIMAL NOT NULL,
    "liquidBalance" DECIMAL NOT NULL,
    "paymentOption" VARCHAR NOT NULL,
    "pixKey" VARCHAR,
    "ownerBankAccount" VARCHAR,
    "documentBankAccount" VARCHAR,
    "bankAccount" VARCHAR,
    "agencyBankAccount" VARCHAR,
    "userId" TEXT,
    "status" "public"."AnnouncementStatus" NOT NULL DEFAULT 'PENDENT',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "auth"."account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "auth"."account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "session_sessionToken_key" ON "auth"."session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_document_key" ON "public"."user"("document");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "auth"."verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "auth"."verification_token"("identifier", "token");

-- AddForeignKey
ALTER TABLE "auth"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."role" ADD CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."announcement" ADD CONSTRAINT "announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
