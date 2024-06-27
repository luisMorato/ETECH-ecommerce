/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CreditCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CreditCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditCard" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_userId_key" ON "CreditCard"("userId");

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
