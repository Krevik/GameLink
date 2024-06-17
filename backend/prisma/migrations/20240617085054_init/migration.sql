-- CreateTable
CREATE TABLE "GameInfo" (
    "id" INTEGER NOT NULL,
    "alternative_names" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "dlcs" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "expanded_games" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "genres" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "name" TEXT NOT NULL,
    "platforms" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "total_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GameInfo_pkey" PRIMARY KEY ("id")
);
