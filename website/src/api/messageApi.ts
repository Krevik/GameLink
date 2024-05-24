import axiosInstance from './axiosConfig';

export const sendMessage = async (data: { senderId: number; receiverId: number; conversationId: number; content: string }) => {
    return axiosInstance.post('/messages/send', data);
};

export const getMessagesByConversationId = async (conversationId: number) => {
    return axiosInstance.get(`/messages/conversation/${conversationId}`);
};
