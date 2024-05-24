import { addNotification } from '../store/notificationSlice';
import store from "../store/store.ts";

export const notifySuccess = (message: string) => {
    store.dispatch(addNotification({ message, type: 'success' }));
};

export const notifyError = (message: string) => {
    store.dispatch(addNotification({ message, type: 'error' }));
};
