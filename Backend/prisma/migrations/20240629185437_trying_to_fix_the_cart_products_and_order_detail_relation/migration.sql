-- DropForeignKey
ALTER TABLE "CartProducts" DROP CONSTRAINT "CartProducts_orderDetailId_fkey";

-- AddForeignKey
ALTER TABLE "CartProducts" ADD CONSTRAINT "CartProducts_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetail"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
