/*
  Warnings:

  - You are about to alter the column `category` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `category` ENUM('HOODIE', 'TSHIRT', 'LONGSLEEVE', 'CAP') NOT NULL;
