import React, { useState } from "react";
import "./MessageList.css";
import MessageBubble from "../MessageBubble/MessageBubble.tsx";
import axiosInstance from "../../../api/axiosConfig.ts";
import { Button } from "primereact/button";
import { Conversation } from "../../../store/slices/messagesSlice.ts";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store.ts";

interface MessageListProps {
    conversationId: number;
    userId: number;
    onConversationIdSelect: (id: number | undefined) => void;
    currentConversation: Conversation | undefined;
    socket: any;
}

const MessageList: React.FC<MessageListProps> = (props: MessageListProps) => {
    const userId: number = useSelector((state: AppState) => state.auth.userId)!;

    const [newMessage, setNewMessage] = useState("");
    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            props.socket.emit("message_sent", { senderId: userId, conversationId: props.conversationId, message: newMessage });
            setNewMessage("");
        }
    };

    return (
        <div className="message-list-container">
            <div className="conversation-title">
                <Button icon="pi pi-chevron-left" onClick={() => props.onConversationIdSelect(undefined)} />
            </div>
            <div className="message-list">
                {props.currentConversation?.messages.map((message) => <MessageBubble key={message.id} content={message.content} isSender={message.senderId === props.userId} />)}
            </div>
            <div className="message-input-container">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessageList;
