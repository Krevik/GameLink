import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./MessageList.css";
import MessageBubble from "../MessageBubble/MessageBubble.tsx";
import { Button } from "primereact/button";
import { Conversation, Message, MessageUserData } from "../../../store/slices/messagesSlice.ts";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store.ts";
import { Socket } from "socket.io-client";
import { HOST_URL } from "../../../api/axiosConfig.ts";

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
        const receiverIds: number[] = props.currentConversation.participants.map((participant) => participant.user.id);
        if (newMessage.trim()) {
            props.socket.emit("message_sent", { senderId: userId, conversationId: props.conversationId, message: newMessage, receiverIds: receiverIds });
            setNewMessage("");
        }
    };

    const getMessages = (): ReactElement => {
        const messages: Message[] = props.currentConversation?.messages || [];
        if (messages.length === 0) {
            return <div className="empty-conversation-message">There are no messages in this conversation yet</div>;
        }
        return (
            <>
                {messages.map((message) => {
                    const sender: MessageUserData = props.currentConversation?.participants.find((participant) => participant.user.id === message.senderId)?.user;
                    return (
                        <MessageBubble
                            key={message.id}
                            content={message.content}
                            isSender={message.senderId === props.userId}
                            sender={sender?.username || "Unknown"}
                            avatar={`${HOST_URL}${sender.profile?.avatarUrl}`} // Use a default avatar if none is provided
                        />
                    );
                })}
            </>
        );
    };

    return (
        <div className="message-list-container">
            <div className="conversation-title">
                <Button icon="pi pi-chevron-left" onClick={() => props.onConversationIdSelect(undefined)} />
                <div className="conversation-title-body">{props.currentConversation?.participants.filter((participant) => participant.user.id !== userId)[0].user.username}</div>
            </div>
            <div className="message-list" ref={containerRef}>
                {getMessages()}
            </div>
            <div className="message-input-container">
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default MessageList;
