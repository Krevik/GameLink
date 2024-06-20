import { prisma } from "../../index";

export const ConversationService = {
    getOrCreateConversation: async (participants: number[]) => {
        //check if there is any conversation with these participants
        const existingConversationsWithTheseParticipants = await prisma.conversation.findFirst({ where: { participants: { every: { userId: { in: participants } } } } });
        if (existingConversationsWithTheseParticipants) {
            return existingConversationsWithTheseParticipants;
        }

        return prisma.conversation.create({
            data: {
                participants: {
                    create: participants.map((userId) => ({ userId })),
                },
            },
            include: {
                messages: true,
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
    },

    getConversationById: async (id: number) => {
        return prisma.conversation.findUnique({
            where: { id },
            include: {
                messages: true,
                participants: true,
            },
        });
    },
};
