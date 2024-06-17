import { Router } from "express";
import { ConversationController } from "./ConversationController";

export const ConversationRouter = Router();

ConversationRouter.post("/create", ConversationController.handleCreateConversation);
ConversationRouter.get("/:id", ConversationController.handleGetConversationById);
