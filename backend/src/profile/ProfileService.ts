import { prisma } from "../../index";

export const ProfileService = {
    createProfile: async (userId: number, bio: string, avatarUrl: string, platform: string, availability: string) => {
        return prisma.profile.create({
            data: {
                userId,
                bio,
                avatarUrl,
                platform,
                availability,
            },
        });
    },

    getProfileByUserId: async (userId: number) => {
        return prisma.profile.findUnique({
            where: { userId },
        });
    },
};
