import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import notificationSlice from "./slices/notificationSlice.ts";
import messagesSlice from "./slices/messagesSlice.ts";

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
