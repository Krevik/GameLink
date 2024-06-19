import React, { useEffect, useRef, useState } from "react";
import "./MessageList.css";
import MessageBubble from "../MessageBubble/MessageBubble.tsx";
import axiosInstance from "../../../api/axiosConfig.ts";
import { Button } from "primereact/button";
import { Conversation } from "../../../store/slices/messagesSlice.ts";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store.ts";
import { Socket } from "socket.io-client";

interface MessageListProps {
    conversationId: number;
    userId: number;
    onConversationIdSelect: (id: number | undefined) => void;
    currentConversation: Conversation | undefined;
    socket: Socket;
}

const MessageList: React.FC<MessageListProps> = (props: MessageListProps) => {
    const userId: number = useSelector((state: AppState) => state.auth.userId)!;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [newMessage, setNewMessage] = useState("");

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(scrollToBottom, []);

    useEffect(scrollToBottom, [props.currentConversation?.messages]);

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
            <div className="message-list" ref={containerRef}>
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
