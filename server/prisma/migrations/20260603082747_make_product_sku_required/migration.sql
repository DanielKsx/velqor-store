/*
  Warnings:

  - Made the column `sku` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `sku` VARCHAR(191) NOT NULL;
