import axiosInstance from './axiosConfig';

export const createGame = async (data: { title: string; genre: string; platform: string }) => {
    return axiosInstance.post('/games', data);
};

export const getGameById = async (id: number) => {
    return axiosInstance.get(`/games/${id}`);
};

export const getAllGames = async () => {
    return axiosInstance.get('/games');
};