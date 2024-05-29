import { useEffect } from "react";
import store, { AppState } from "../store.ts";
import { setAccessToken, setUserId } from "../slices/authSlice.ts";
import { useSelector } from "react-redux";

export const useAuthenticationTokenSyncer = () => {
    const accessToken = useSelector((state: AppState) => state.auth.accessToken);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userIdFromStorage = localStorage.getItem("userId");
        if (token) {
            store.dispatch(setAccessToken(token));
        }
        if (userIdFromStorage) {
            store.dispatch(setUserId(Number(userIdFromStorage)));
        }
    }, []);
};
