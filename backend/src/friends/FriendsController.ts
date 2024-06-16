import { prisma } from "../../index";
import { Profile } from "@prisma/client";

export interface UserBasicDetailsDTO {
    id: number;
    steamId: string | null;
    email: string;
    username: string;
    profile: Profile | null;
}

interface FriendDTO {
    id: number;
    senderId: number;
    receiverId: number;
    accepted: boolean;
    friend: UserBasicDetailsDTO | undefined;
}

export const FriendsController = {
    getFriends: async (userId: number): Promise<FriendDTO[]> => {
        const users = await prisma.friend.findMany({
            where: {
                OR: [
                    { senderId: userId, accepted: true },
                    { receiverId: userId, accepted: true },
                ],
            },
            include: {
                sender: { select: { id: true, steamId: true, email: true, username: true, profile: true } },
                receiver: { select: { id: true, steamId: true, email: true, username: true, profile: true } },
            },
        });

        //TODO if two people invited each other and accepted each other we gonna have duplicates here
        //TODO fix the mechanism of friend acceptance, so the other friend request is deleted
        return users.map((friendEntry) => {
            const friendDTO: FriendDTO = {
                id: friendEntry.id,
                accepted: friendEntry.accepted,
                receiverId: friendEntry.receiverId,
                senderId: friendEntry.senderId,
                friend: undefined,
            };
            if (friendEntry.senderId === userId) {
                friendDTO.friend = friendEntry.receiver;
            } else {
                friendDTO.friend = friendEntry.sender;
            }
            return friendDTO;
        });
    },

    inviteFriend: async (userId: number, friendId: number) => {
        return prisma.friend.create({
            data: {
                senderId: userId,
                receiverId: friendId,
            },
        });
    },

    removeFriend: async (userId: number, friendId: number) => {
        return prisma.friend.deleteMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: friendId },
                    { senderId: friendId, receiverId: userId },
                ],
            },
        });
    },

    getFriendRequests: async (userId: number) => {
        return prisma.friend.findMany({
            where: {
                receiverId: userId,
                accepted: false,
            },
            include: {
                sender: true,
            },
        });
    },

    acceptFriendRequest: async (userId: number, friendId: number) => {
        return prisma.friend.updateMany({
            where: {
                senderId: friendId,
                receiverId: userId,
                accepted: false,
            },
            data: {
                accepted: true,
            },
        });
    },

    declineFriendRequest: async (userId: number, friendId: number) => {
        return prisma.friend.deleteMany({
            where: {
                senderId: friendId,
                receiverId: userId,
                accepted: false,
            },
        });
    },
};
