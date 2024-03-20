-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "contact" VARCHAR(20),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,
    "avatarUrl" TEXT,
    "verifiedEmail" BOOLEAN DEFAULT false,

    CONSTRAINT "PK_USER" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "description" VARCHAR(75),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "PK_ROLE" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realm" (
    "id" TEXT NOT NULL,
    "acronym" VARCHAR(15) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(150),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "PK_REALM" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "id" TEXT NOT NULL,
    "method" VARCHAR(6) NOT NULL,
    "route" VARCHAR(75) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "PK_RESOURCE" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_document_key" ON "user"("document");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");
