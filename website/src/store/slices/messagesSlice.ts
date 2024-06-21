import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Conversation {
    id: number;
    participants: Array<{ user: MessageUserData }>;
    messages: Array<Message>;
}

export interface MessageUserData {
    id: number;
    username: string;
    profile: { avatarUrl?: string };
}

export interface Message {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    createdAt: string;
    conversationId: number;
}

export interface MessagesState {
    areMessagesOpen: boolean;
    selectedConversationId?: number;
    conversations: Conversation[];
}

const initialState: MessagesState = {
    areMessagesOpen: false,
    selectedConversationId: undefined,
    conversations: [],
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setAreMessagesOpen(state, action: PayloadAction<boolean>) {
            state.areMessagesOpen = action.payload;
        },
        setSelectedConversationId(state, action: PayloadAction<number | undefined>) {
            state.selectedConversationId = action.payload;
        },
        setConversations(state, action: PayloadAction<Conversation[]>) {
            state.conversations = getSortedConversations(action.payload);
        },
        addMessageToConversation(state, action: PayloadAction<{ message: Message }>) {
            const conversation = state.conversations.find((conversation) => conversation.id === action.payload.message.conversationId);
            if (conversation && !conversation.messages.find((message) => message.id === action.payload.message.id)) {
                conversation.messages.push(action.payload.message);
            }
            state.conversations = getSortedConversations(state.conversations);
        },
    },
});

const getSortedConversations = (conversations: Conversation[]): Conversation[] => {
    return conversations.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        if (lastMessageA && lastMessageB) {
            return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime();
        }
        return 0;
    });
};

export const { setAreMessagesOpen, setSelectedConversationId, setConversations, addMessageToConversation } = messagesSlice.actions;

export default messagesSlice.reducer;
