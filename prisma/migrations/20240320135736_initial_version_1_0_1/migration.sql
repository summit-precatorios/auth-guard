-- AlterTable
ALTER TABLE "role" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
