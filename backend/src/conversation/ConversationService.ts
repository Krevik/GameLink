import { prisma } from "../../index";

export const ConversationService = {
    createConversation: async (participants: number[]) => {
        return prisma.conversation.create({
            data: {
                participants: {
                    create: participants.map((userId) => ({ userId })),
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
    }

}

