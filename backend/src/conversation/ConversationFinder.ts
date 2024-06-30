import {prisma} from "../../index";
import Logger from "../Logger/Logger";

const logger = new Logger("ConversationFinder");

export const ConversationFinder = {
    getConversationsForUser: async (userId: number) => {
        try {
            return await prisma.conversation.findMany({
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
                        include: {
                            readReceipts: true,
                        }
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
        } catch (error) {
            logger.error(`Error while fetching conversations for user ${userId}: ${error}`);
            return Promise.resolve([]);
        }
    },
};
