import { Request, Response } from "express";
import { createConversation, getConversationById } from "../services/conversationService";
import { CommandResult } from "../utils/CommandResult";

export const handleCreateConversation = async (req: Request, res: Response) => {
    const { participants } = req.body;
    try {
        await createConversation(participants);
        res.status(201).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error creating conversation"));
    }
};

export const handleGetConversationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const conversation = await getConversationById(Number(id));
        if (conversation) {
            res.json(conversation);
        } else {
            res.status(404).json(CommandResult.failure("Conversation not found"));
        }
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error fetching conversation"));
    }
};
