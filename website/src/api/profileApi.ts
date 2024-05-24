import axiosInstance from './axiosConfig';

export const createProfile = async (data: { userId: number; bio: string; avatarUrl: string; platform: string; gameStyle: string; availability: string }) => {
    return axiosInstance.post('/profiles', data);
};

export const getProfileByUserId = async (userId: number) => {
    return axiosInstance.get(`/profiles/${userId}`);
};
