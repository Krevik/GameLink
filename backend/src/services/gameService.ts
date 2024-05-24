import { prisma } from "../../index";

export const createGame = async (title: string, genre: string, platform: string) => {
    return prisma.game.create({
        data: {
            title,
            genre,
            platform,
        },
    });
};

export const getGameById = async (id: number) => {
    return prisma.game.findUnique({
        where: { id },
    });
};

export const getAllGames = async () => {
    return prisma.game.findMany();
};
