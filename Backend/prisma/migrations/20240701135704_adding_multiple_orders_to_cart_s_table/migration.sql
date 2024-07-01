/*
  Warnings:

  - You are about to drop the column `orderDetailId` on the `CartProducts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderDetailId_fkey";

-- AlterTable
ALTER TABLE "CartProducts" DROP COLUMN "orderDetailId";

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
