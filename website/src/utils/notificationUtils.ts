import { addNotification } from "../store/slices/notificationSlice.ts";
import store from "../store/store.ts";

const notifySuccess = (message: string) => {
    store.dispatch(addNotification({ message, type: "success" }));
};

const notifyError = (message: string) => {
    store.dispatch(addNotification({ message, type: "error" }));
};

export const NotificationUtils = {
    notifySuccess: notifySuccess,
    notifyError: notifyError,
};
