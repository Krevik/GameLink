import { addNotification } from "../store/slices/notificationSlice.ts";
import store from "../store/store.ts";
import { TranslationUtils } from "./translation/TranslationUtils.ts";

const notifySuccess = (message: string) => {
    store.dispatch(addNotification({ message: TranslationUtils.getAnything(message), type: "success" }));
};

const notifyError = (message: string) => {
    store.dispatch(addNotification({ message: TranslationUtils.getAnything(message), type: "error" }));
};

export const NotificationUtils = {
    notifySuccess: notifySuccess,
    notifyError: notifyError,
};
