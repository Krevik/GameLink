import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { AppState } from "../../store/store.ts";
import { Toast } from "primereact/toast";
import { removeNotifications } from "../../store/slices/notificationSlice.ts";

const Notification: React.FC = () => {
    const notifications = useSelector((state: AppState) => state.notifications.notifications);
    const toast = React.useRef<Toast | null>(null);

    useEffect(() => {
        if (notifications.length > 0) {
            notifications.forEach((notification) => {
                toast.current?.show({ severity: notification.type, summary: notification.message });
            });
            store.dispatch(removeNotifications());
        }
    }, [notifications]);

    return (
        <div>
            <Toast ref={toast} />
        </div>
    );
};

export default Notification;
