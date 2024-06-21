import React from "react";
import "./ConversationList.css";
import { Conversation } from "../../../store/slices/messagesSlice.ts";
import { AppState } from "../../../store/store.ts";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface ConversationListProps {
    userId: number;
    onSelectConversation: (conversationId: number) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ userId, onSelectConversation }) => {
    const conversations: Conversation[] = useSelector((state: AppState) => state.messages.conversations);

    const getConversationReceiverUserName = (conversation: Conversation): string =>
        conversation.participants.filter((participant) => participant.user.id != userId)[0].user.username;

    return (
        <div className="conversation-list-container">
            {conversations.map((conversation) => (
                <Card key={conversation.id} className="conversation-card" onClick={() => onSelectConversation(conversation.id)}>
                    <div className="conversation-content">
                        <span>{getConversationReceiverUserName(conversation)}</span>
                        <Button icon="pi pi-angle-right" className="p-button-rounded p-button-text" />
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ConversationList;
