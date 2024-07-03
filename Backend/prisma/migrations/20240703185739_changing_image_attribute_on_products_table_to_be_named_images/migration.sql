/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productSubCategory" DROP CONSTRAINT "productSubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];

-- AddForeignKey
ALTER TABLE "productSubCategory" ADD CONSTRAINT "productSubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
