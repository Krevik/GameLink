/*
  Warnings:

  - You are about to drop the column `url` on the `GameInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "url",
ADD COLUMN     "similar_games" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "small_img_url" TEXT,
ADD COLUMN     "summary" TEXT;
