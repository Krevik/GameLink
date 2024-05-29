import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userId: number | null;
    accessToken: string | null;
}

const initialState: AuthState = {
    userId: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<number>) {
            state.userId = action.payload;
            localStorage.setItem("userId", action.payload.toString());
        },
        clearUserId(state) {
            state.userId = null;
            localStorage.removeItem("userId");
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            localStorage.setItem("accessToken", action.payload);
        },
        clearAccessToken(state) {
            state.accessToken = null;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setAccessToken, clearAccessToken, setUserId, clearUserId } = authSlice.actions;

export default authSlice.reducer;
