/*
  Warnings:

  - You are about to drop the column `orderDetailId` on the `CartProducts` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `OrderDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartProducts" DROP CONSTRAINT "CartProducts_orderDetailId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartProducts" DROP COLUMN "orderDetailId";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "cartId";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_orderId_key" ON "Cart"("orderId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
