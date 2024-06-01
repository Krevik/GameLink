import { Router } from "express";
import { ConversationController } from "./ConversationController";

export const ConversationRouter = Router();

ConversationRouter.post("/", ConversationController.handleCreateConversation);
ConversationRouter.get("/:id", ConversationController.handleGetConversationById);
