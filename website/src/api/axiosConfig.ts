import axios from "axios";

export const HOST_URL = "http://localhost:8124";

const axiosInstance = axios.create({
    baseURL: HOST_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
