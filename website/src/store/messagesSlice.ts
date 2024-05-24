import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Conversation {
    id: number;
    participants: Array<{ user: MessageUserData }>;
    messages: Array<Message>;
}

export interface MessageUserData {
    id: number;
    username: string;
}

export interface Message {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    createdAt: string;
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
            state.conversations = action.payload;
        },
    },
});

export const { setAreMessagesOpen, setSelectedConversationId, setConversations } = messagesSlice.actions;

export default messagesSlice.reducer;
