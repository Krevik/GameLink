import { Router } from "express";
import { handleCreateConversation, handleGetConversationById } from "../controllers/conversationController";

const router = Router();

router.post("/", handleCreateConversation);
router.get("/:id", handleGetConversationById);

export default router;
