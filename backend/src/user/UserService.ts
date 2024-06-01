import { prisma } from "../../index";

export const UserService = {
    createUser: async (email: string, password: string, username: string) => {
        return prisma.user.create({
            data: {
                email,
                password,
                username,
            },
        });
    },

    getUserById: async (id: number) => {
        return prisma.user.findUnique({
            where: { id },
        });
    },

    getAllUsers: async () => {
        return prisma.user.findMany();
    },
};
