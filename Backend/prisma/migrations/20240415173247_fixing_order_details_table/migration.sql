/*
  Warnings:

  - You are about to drop the column `OrderDetailId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `OrderDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderDetailId` to the `CartProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_OrderDetailId_fkey";

-- DropIndex
DROP INDEX "Order_OrderDetailId_key";

-- AlterTable
ALTER TABLE "CartProducts" ADD COLUMN     "orderDetailId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "OrderDetailId";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "price";

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_orderId_key" ON "OrderDetail"("orderId");

-- AddForeignKey
ALTER TABLE "CartProducts" ADD CONSTRAINT "CartProducts_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
