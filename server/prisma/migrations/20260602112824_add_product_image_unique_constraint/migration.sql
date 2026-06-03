/*
  Warnings:

  - A unique constraint covering the columns `[productId,order]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductImage_productId_order_key` ON `ProductImage`(`productId`, `order`);
