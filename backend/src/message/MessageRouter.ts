import { Router } from "express";
import { MessageController } from "./MessageController";

const router = Router();

router.get("/unread/:userId", MessageController.getUnreadMessagesCount);
router.post("/read", MessageController.markMessageAsRead);
router.get("/conversation/:conversationId", MessageController.getMessagesForConversation);
router.get("/users/search", MessageController.searchUsers);
router.post("/sendMessage", MessageController.sendMessage);

export default router;
