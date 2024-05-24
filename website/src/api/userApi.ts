import axiosInstance from './axiosConfig';

export const createUser = async (data: { email: string; password: string; username: string }) => {
    return axiosInstance.post('/users', data);
};

export const getUserById = async (id: number) => {
    return axiosInstance.get(`/users/${id}`);
};

export const getAllUsers = async () => {
    return axiosInstance.get('/users');
};
