import { prisma } from "../../index";

export const createUser = async (email: string, password: string, username: string) => {
    return prisma.user.create({
        data: {
            email,
            password,
            username,
        },
    });
};

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

export const getAllUsers = async () => {
    return prisma.user.findMany();
};
