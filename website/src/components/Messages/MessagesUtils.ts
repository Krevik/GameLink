import {Conversation, Message} from "../../store/slices/messagesSlice.ts";

export const MessagesUtils = {
    isMessageReadByMe: (message: Message, currentUserId: number) => message.readReceipts.some(redReceipt => redReceipt.userId === currentUserId),
    isMessageReadByUser: (message: Message, userId: number) => message.readReceipts.some(redReceipt => redReceipt.userId === userId),
    getUnreadMessagesCount: (conversation: Conversation, userId: number) => conversation.messages.filter(message => !MessagesUtils.isMessageReadByMe(message, userId)).length,
}