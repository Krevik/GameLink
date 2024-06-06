import { Request, Response } from "express";
import { prisma } from "../../index";
import { CommandResult } from "../utils/CommandResult";

export const MessageController = {
    getUnreadMessagesCount: async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

        try {
            const count = await prisma.message.count({
                where: {
                    conversation: {
                        participants: {
                            some: {
                                userId: userId,
                            },
                        },
                    },
                    readReceipts: {
                        none: {
                            userId: userId,
                        },
                    },
                },
            });

            res.json({ count });
        } catch (error) {
            res.status(500).json(CommandResult.failure("FAILED_TO_FETCH_UNREAD_MESSAGES_COUNT"));
        }
    },

    markMessageAsRead: async (req: Request, res: Response) => {
        const { userId, messageId } = req.body;

        try {
            await prisma.messageReadReceipt.create({
                data: {
                    userId: userId,
                    messageId: messageId,
                },
            });

            res.status(204).json(CommandResult.success());
        } catch (error) {
            res.status(500).json(CommandResult.failure("FAILED_TO MARK_MESSAGE_AS_READ"));
        }
    },

    getMessagesForConversation: async (req: Request, res: Response) => {
        const conversationId = parseInt(req.params.conversationId);

        try {
            const messages = await prisma.message.findMany({
                where: {
                    conversationId: conversationId,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });

            res.json(messages);
        } catch (error) {
            res.status(500).json(CommandResult.failure("FAILED_TO_FETCH_MESSAGES_FOR_CONVERSATION"));
        }
    },

    sendMessage: async (req: Request, res: Response) => {
        const { content, senderId, receiverId, conversationId } = req.body;

        try {
            const message = await prisma.message.create({
                data: {
                    content,
                    senderId,
                    conversationId,
                    readReceipts: {
                        create: {
                            userId: senderId,
                        },
                    },
                },
            });

            res.status(201).json(message);
        } catch (error) {
            res.status(500).json(CommandResult.failure("FAILED_TO_SEND_MESSAGE"));
        }
    },

    getConversationsForUser: async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);

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

            res.json(conversations);
        } catch (error) {
            res.status(500).json(CommandResult.failure("FAILED_TO_FETCH_CONVERSATIONS"));
        }
    },

    searchUsers: async (req: Request, res: Response) => {
        const { username } = req.query;

        try {
            const users = await prisma.user.findMany({
                where: {
                    username: {
                        contains: username as string,
                        mode: "insensitive",
                    },
                },
            });

            res.json(users);
        } catch (error) {
            res.status(500).json(CommandResult.failure("FAILED_TO_SEARCH_USERS"));
        }
    },
};
