/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameOnUser" DROP CONSTRAINT "GameOnUser_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameOnUser" DROP CONSTRAINT "GameOnUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_hostId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "favouriteGames" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "GameOnUser";

-- DropTable
DROP TABLE "GameSession";
