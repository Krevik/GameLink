/*
  Warnings:

  - The `platform_logo` column on the `Platform` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "platform_logo",
ADD COLUMN     "platform_logo" INTEGER;
