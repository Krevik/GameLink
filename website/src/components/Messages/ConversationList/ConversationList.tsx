import React from "react";
import "./ConversationList.css";
import { Conversation, setSelectedConversationId } from "../../../store/slices/messagesSlice.ts";
import { AppState } from "../../../store/store.ts";
import { useSelector } from "react-redux";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";

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
                <>
                    <div key={conversation.id} onClick={() => onSelectConversation(conversation.id)} className="conversation-list">
                        {getConversationReceiverUserName(conversation)}
                    </div>
                </>
            ))}
        </div>
    );
};

export default ConversationList;
