/*
  Warnings:

  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.
  - Added the required column `productColorSnapshot` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSizeSnapshot` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `productColorSnapshot` ENUM('BLACK', 'WHITE', 'GREY') NOT NULL,
    ADD COLUMN `productSizeSnapshot` ENUM('XS', 'S', 'M', 'L', 'XL') NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `stock`;

-- CreateTable
CREATE TABLE `ProductVariant` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `color` ENUM('BLACK', 'WHITE', 'GREY') NOT NULL,
    `size` ENUM('XS', 'S', 'M', 'L', 'XL') NOT NULL,
    `stock` INTEGER NOT NULL,

    UNIQUE INDEX `ProductVariant_productId_color_size_key`(`productId`, `color`, `size`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
