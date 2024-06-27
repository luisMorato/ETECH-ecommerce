-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" DROP DEFAULT;

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);
