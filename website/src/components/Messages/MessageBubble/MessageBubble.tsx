import React from "react";
import "./MessageBubble.css";

interface MessageBubbleProps {
    content: string;
    isSender: boolean;
    sender: string;
    avatar: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isSender, sender, avatar }) => {
    return (
        <div className={`message-bubble ${isSender ? "sender" : "receiver"}`}>
            {!isSender && <img src={avatar} alt="avatar" className="avatar" />}
            <div className={`message-content ${isSender ? "sender" : "receiver"}`}>
                {!isSender && <div className="message-sender">{sender}</div>}
                <div className="message-text">{content}</div>
            </div>
        </div>
    );
};

export default MessageBubble;
