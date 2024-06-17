import { prisma } from "../../index";

export const ConversationService = {
    createConversation: async (participants: number[]) => {
        //check if there is any conversation with these participants
        const existingConversationsWithTheseParticipants = await prisma.conversation.findMany({ where: { participants: { every: { userId: { in: participants } } } } });
        if (existingConversationsWithTheseParticipants.length > 0) {
            return;
        }

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
    },
};
