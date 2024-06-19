import { Request, Response } from "express";
import { prisma } from "../../index";
import { CommandResult } from "../utils/CommandResult";

export const ConversationFinder = {
    getConversationsForUser: async (userId: number) => {
        try {
            const conversations = await prisma.conversation.findMany({
                where: {
                    participants: {
                        some: {
                            userId: userId,
                        },
                    },
                },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: "asc",
                        },
                    },
                    participants: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    email: true,
                                    profile: true,
                                },
                            },
                        },
                    },
                },
            });

            return conversations;
        } catch (error) {
            //TODO error logging
        }
    },
};
