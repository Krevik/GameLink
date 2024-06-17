import axiosInstance from "./axiosConfig";

export const getAllUsers = async () => {
    return axiosInstance.get("/users");
};
