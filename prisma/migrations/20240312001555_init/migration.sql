-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(11) NOT NULL,
    "email" VARCHAR(50),
    "password" VARCHAR(150) NOT NULL,
    "firstName" VARCHAR(150),
    "lastName" VARCHAR(150) NOT NULL,
    "contact" VARCHAR(20),
    "createdAt" TIMESTAMP,
    "logicalExclusion" TIMESTAMP,
    "avatarUrl" TEXT,
    "verifiedEmail" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
