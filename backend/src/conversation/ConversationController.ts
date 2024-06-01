import { Request, Response } from "express";
import { CommandResult } from "../utils/CommandResult";
import { ConversationService } from "./ConversationService";

export const ConversationController = {
    handleCreateConversation: async (req: Request, res: Response) => {
        const { participants } = req.body;
        try {
            await ConversationService.createConversation(participants);
            res.status(201).json(CommandResult.success());
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error creating conversation"));
        }
    },

    handleGetConversationById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const conversation = await ConversationService.getConversationById(Number(id));
            if (conversation) {
                res.json(conversation);
            } else {
                res.status(404).json(CommandResult.failure("Conversation not found"));
            }
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error fetching conversation"));
        }
    },
};
