import { Request, Response } from "express";
import { CommandResult } from "../utils/CommandResult";
import { ConversationService } from "./ConversationService";
import { Conversation } from "@prisma/client";

export const ConversationController = {
    handleCreateConversation: async (req: Request, res: Response) => {
        const { participants } = req.body;
        try {
            // @ts-ignore
            const conversation: Conversation = await ConversationService.getOrCreateConversation(participants);
            res.json(conversation);
        } catch (error) {
            res.status(500).json(CommandResult.failure("ERROR_GETTING_CONVERSATION"));
        }
    },

    handleGetConversationById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const conversation = await ConversationService.getConversationById(Number(id));
            if (conversation) {
                res.json(conversation);
            } else {
                res.status(404).json(CommandResult.failure("CONVERSATION_NOT_FOUND"));
            }
        } catch (error) {
            res.status(500).json(CommandResult.failure("ERROR_GETTING_CONVERSATION"));
        }
    },
};
