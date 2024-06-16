import { prisma } from "../../index";

export const DatabaseSeeder = {
    seedDatabase: async () => {
        //users
        //create 5 example users
        await prisma.user.createMany({
            data: [
                { email: "test1@gmail.com", password: "test1", username: "test1" },
                { email: "test2@gmail.com", password: "test2", username: "test2" },
                { email: "test3@gmail.com", password: "test3", username: "test3" },
                { email: "test4@gmail.com", password: "test4", username: "test4" },
                { email: "test5@gmail.com", password: "test5", username: "test5" },
            ],
        });

        //create friendships
        await prisma.friend.createMany({
            data: [
                { accepted: true, senderId: 1, receiverId: 2 },
                { accepted: true, senderId: 2, receiverId: 3 },
                { accepted: true, senderId: 3, receiverId: 4 },
                { accepted: true, senderId: 4, receiverId: 5 },
                { accepted: true, senderId: 5, receiverId: 1 },
            ],
        });
    },
};
