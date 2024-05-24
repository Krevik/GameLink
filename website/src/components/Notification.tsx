import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/store";
import { removeNotification } from "../store/notificationSlice";

const Notification: React.FC = () => {
    const notifications = useSelector((state: AppState) => state.notifications.notifications);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(removeNotification());
    };

    return (
        <div>
            {notifications.map((notification, index) => (
                <Snackbar key={index} open={true} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={notification.type} sx={{ width: "100%" }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </div>
    );
};

export default Notification;
