import { Request, Response } from "express";
import { CommandResult } from "../utils/CommandResult";
import { ConversationService } from "./ConversationService";

export const ConversationController = {
    handleCreateConversation: async (req: Request, res: Response) => {
        const { participants } = req.body;
        try {
            await ConversationService.createConversation(participants);
        } catch (error) {}
        res.status(201).json(CommandResult.success());
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
