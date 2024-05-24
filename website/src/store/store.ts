import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notificationSlice from "./notificationSlice.ts";
import messagesSlice from "./messagesSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        notifications: notificationSlice,
        messages: messagesSlice,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
