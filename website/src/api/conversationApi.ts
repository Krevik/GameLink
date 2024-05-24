import axiosInstance from './axiosConfig';

export const createConversation = async (data: { participants: number[] }) => {
    return axiosInstance.post('/conversations', data);
};

export const getConversationById = async (id: number) => {
    return axiosInstance.get(`/conversations/${id}`);
};
