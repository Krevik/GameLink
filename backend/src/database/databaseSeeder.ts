import { prisma } from "../../index";
import bcrypt from "bcryptjs";
import { SexType } from "@prisma/client";

const createUserDetails = async (times: number) => {
    const userDetails: { id: number; username: string; email: string; password: string }[] = [];
    const hashedPassword = await bcrypt.hash("test123", 10);

    for (let i = 0; i < times; i++) {
        userDetails.push({ id: i, username: `test${i}`, email: `testEmailNo${i}@gmail.com`, password: hashedPassword });
    }
    return userDetails;
};

function getRandomIntInRange(min: number, max: number): number {
    if (min > max) {
        throw new Error("The min value should be less than or equal to the max value.");
    }
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

const createUserProfileDetails = (userId: number) => {
    return {
        userId: userId,
        bio: "Test User bio",
        age: getRandomIntInRange(1, 200),
        availability: "Always",
        avatarUrl: "/uploads/profilePictures/rock.jpg",
        sex: getRandomIntInRange(1, 2) === 1 ? SexType.MALE : SexType.FEMALE,
        availablePlatforms: ["PC", "PS4", "XBOX"],
        favouriteGames: ["l4d2", "csgo"],
    };
};

function generateUniqueFriends(userIds: number[]): { senderId: number; receiverId: number; accepted: boolean }[] {
    const friends: { senderId: number; receiverId: number; accepted: boolean }[] = [];
    const usedPairs = new Set<string>();

    for (let i = 0; i < userIds.length; i++) {
        for (let j = i + 1; j < userIds.length; j++) {
            const senderId = userIds[i];
            const receiverId = userIds[j];

            const pairKey1 = `${senderId}-${receiverId}`;
            const pairKey2 = `${receiverId}-${senderId}`;

            if (!usedPairs.has(pairKey1) && !usedPairs.has(pairKey2)) {
                friends.push({ senderId, receiverId, accepted: true });
                usedPairs.add(pairKey1);
            }
        }
    }

    return friends;
}

const DatabaseSeeder = {
    cleanAndSeed: async () => {
        await prisma.messageReadReceipt.deleteMany({});
        await prisma.message.deleteMany({});
        await prisma.userOnConversation.deleteMany({});
        await prisma.conversation.deleteMany({});
        await prisma.profile.deleteMany({});
        await prisma.friend.deleteMany({});
        await prisma.user.deleteMany();

        try {
            //create users
            const userDetails = await createUserDetails(50);
            const userIds: number[] = userDetails.map((user) => user.id);
            await prisma.user.createMany({ data: userDetails });

            //create profiles
            const userProfiles = userIds.map((userId) => createUserProfileDetails(userId));
            await prisma.profile.createMany({ data: userProfiles });

            //create friends
            const friends = generateUniqueFriends(userIds);
            await prisma.friend.createMany({ data: friends });
        } catch (error) {
            console.log("Couldn't seed the database");
            console.dir(error);
        }
    },
};

DatabaseSeeder.cleanAndSeed();
