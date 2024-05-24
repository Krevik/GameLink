import React from "react";
import "./MessageBubble.css";

interface MessageBubbleProps {
    content: string;
    isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isSender }) => {
    return <div className={`message-bubble ${isSender ? "sender" : "receiver"}`}>{content}</div>;
};

export default MessageBubble;
