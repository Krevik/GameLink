/*
  Warnings:

  - You are about to drop the column `small_img_url` on the `GameInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "small_img_url",
ADD COLUMN     "img_url" TEXT;
