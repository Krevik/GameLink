import { Router } from "express";
import { getConversationsForUser, getMessagesForConversation, getUnreadMessagesCount, markMessageAsRead, searchUsers, sendMessage } from "../controllers/messageController";

const router = Router();

router.get("/unread/:userId", getUnreadMessagesCount);
router.post("/read", markMessageAsRead);
router.get("/conversation/:conversationId", getMessagesForConversation);
router.get("/conversations/:userId", getConversationsForUser);
router.get("/users/search", searchUsers);
router.post("/sendMessage", sendMessage);

export default router;
