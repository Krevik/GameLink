/*
  Warnings:

  - You are about to drop the column `gameStyle` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SexType" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "gameStyle",
ADD COLUMN     "sex" "SexType",
ALTER COLUMN "platform" DROP NOT NULL,
ALTER COLUMN "availability" DROP NOT NULL;
