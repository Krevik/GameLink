import { prisma } from "../../index";

export const createProfile = async (userId: number, bio: string, avatarUrl: string, platform: string, gameStyle: string, availability: string) => {
    return prisma.profile.create({
        data: {
            userId,
            bio,
            avatarUrl,
            platform,
            gameStyle,
            availability,
        },
    });
};

export const getProfileByUserId = async (userId: number) => {
    return prisma.profile.findUnique({
        where: { userId },
    });
};
