import MessageList from "./MessageList/MessageList.tsx";
import ConversationList from "./ConversationList/ConversationList.tsx";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import store, { AppState } from "../../store/store.ts";
import { Conversation, MessagesState, setAreMessagesOpen, setConversations, setSelectedConversationId } from "../../store/slices/messagesSlice.ts";
import { Button } from "primereact/button";
import "./MessagesComponent.css";
import axiosInstance from "../../api/axiosConfig.ts";

export const MessagesComponent = () => {
    const userId: number = useSelector((state: AppState) => state.auth.userId)!;
    const messagesState: MessagesState = useSelector((state: AppState) => state.messages);
    const conversations: Conversation[] = useSelector((state: AppState) => state.messages.conversations);

    useEffect(() => {
        fetchConversations();
    }, []);

    //TODO websocket implementation
    // const ws = new WebSocket("ws://localhost:8080/ws");

    //
    // useEffect(() => {
    //     fetchConversations();
    //
    //     const interval = setInterval(() => {
    //         fetchConversations();
    //     }, 5000);
    //
    //     return () => clearInterval(interval);
    // }, []);

    const fetchConversations = async () => {
        try {
            const response = await axiosInstance.get(`/messages/conversations/${userId}`);
            store.dispatch(setConversations(response.data));
        } catch (error) {
            console.error("Failed to fetch conversations", error);
        }
    };

    const onSelectConversationId = (conversationId: number | undefined) => {
        store.dispatch(setSelectedConversationId(conversationId));
    };

    const getChatWidgetClassname: string = messagesState.areMessagesOpen ? "chat-widget" : "chat-widget-disabled";

    const currentConversation: Conversation | undefined = conversations.find((conversation) => conversation.id === messagesState.selectedConversationId);

    const getInnerMessagesComponent = (): ReactElement =>
        messagesState.selectedConversationId ? (
            <>
                <MessageList
                    currentConversation={currentConversation}
                    conversationId={messagesState.selectedConversationId}
                    onConversationIdSelect={onSelectConversationId}
                    userId={userId!}
                />
                <Button className="hide-button" icon="pi pi-chevron-down" onClick={() => store.dispatch(setAreMessagesOpen(false))} />
            </>
        ) : (
            <>
                <ConversationList userId={userId} onSelectConversation={onSelectConversationId} />
                <Button className="hide-button" icon="pi pi-chevron-down" onClick={() => store.dispatch(setAreMessagesOpen(false))} />
            </>
        );

    return (
        <div className={getChatWidgetClassname}>
            {messagesState.areMessagesOpen ? (
                getInnerMessagesComponent()
            ) : (
                <Button className="messages-button" icon="pi pi-comment" onClick={() => store.dispatch(setAreMessagesOpen(true))}></Button>
            )}
        </div>
    );
};
