import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
    message: string;
    type: "success" | "error" | "info" | "warn";
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<Notification>) {
            state.notifications.push(action.payload);
        },
        removeNotifications(state) {
            state.notifications.shift();
        },
    },
});

export const { addNotification, removeNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
