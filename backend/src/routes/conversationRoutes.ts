import { Router } from "express";
import { handleCreateConversation, handleGetConversationById } from "../controllers/conversationController";

export const conversationRoutes = Router();

conversationRoutes.post("/", handleCreateConversation);
conversationRoutes.get("/:id", handleGetConversationById);
