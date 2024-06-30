import React from "react";
import "./ConversationList.scss";
import { Conversation } from "../../../store/slices/messagesSlice.ts";
import { AppState } from "../../../store/store.ts";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import {HOST_URL} from "../../../api/axiosConfig.ts";
import {MessagesUtils} from "../MessagesUtils.ts";
import {Badge} from "primereact/badge";

interface ConversationListProps {
    userId: number;
    onSelectConversation: (conversationId: number) => void;
}

const getTheOtherParticipant = (conversation: Conversation, currentUserId: number) => conversation.participants.filter((participant) => participant.user.id != currentUserId)[0].user;

const getConversationReceiverUserName = (conversation: Conversation, currentUserId: number): string =>
    getTheOtherParticipant(conversation, currentUserId).username;

const getConversationReceiverAvatarUrl = (conversation: Conversation, currentUserId: number): string => `${HOST_URL}${getTheOtherParticipant(conversation, currentUserId).profile?.avatarUrl}`;


const ConversationList: React.FC<ConversationListProps> = ({ userId, onSelectConversation }) => {
    const conversations: Conversation[] = useSelector((state: AppState) => state.messages.conversations);

    const mapConversationToReactElement = () => conversations.map((conversation) => (
        <Card key={conversation.id} className="conversation-card" onClick={() => onSelectConversation(conversation.id)}>
            <div className="conversation-content">
                <img className="conversation-picture" alt="conversation-picture" src={getConversationReceiverAvatarUrl(conversation, userId)}/>
                <span>{getConversationReceiverUserName(conversation, userId)}</span>
                <Badge value={MessagesUtils.getUnreadMessagesCount(conversation, userId)}/>
                <Button icon="pi pi-angle-right" className="p-button-rounded p-button-text" />
            </div>
        </Card>
    ))

    return (
        <div className="conversation-list-container">
            {mapConversationToReactElement()}
        </div>
    );
};

export default ConversationList;
