import { Request, Response } from "express";
import { prisma } from "../../index";

export const getUnreadMessagesCount = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Failed to fetch unread messages count" });
    }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
    const { userId, messageId } = req.body;

    try {
        await prisma.messageReadReceipt.create({
            data: {
                userId: userId,
                messageId: messageId,
            },
        });

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to mark message as read" });
    }
};

export const getMessagesForConversation = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Failed to fetch messages for conversation" });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Failed to send message" });
    }
};

export const getConversationsForUser = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Failed to fetch conversations for user" });
    }
};

export const searchUsers = async (req: Request, res: Response) => {
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
        res.status(500).json({ error: "Failed to search users" });
    }
};
