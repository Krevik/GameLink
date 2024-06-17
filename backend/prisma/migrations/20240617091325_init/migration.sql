/*
  Warnings:

  - The `alternative_names` column on the `GameInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "alternative_names",
ADD COLUMN     "alternative_names" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
