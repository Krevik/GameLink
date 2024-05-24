-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "availablePlatforms" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "favouritePlatform" TEXT;
