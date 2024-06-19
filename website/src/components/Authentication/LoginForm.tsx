import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserId } from "../../store/slices/authSlice.ts";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig.ts";
import { AppState } from "../../store/store.ts";
import { translate } from "../../utils/translation/TranslationUtils.ts";
import { NotificationUtils } from "../../utils/notificationUtils.ts";
import { CommandResult } from "../../utils/RestUtils.ts";
import styles from "./LoginForm.module.scss";

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((state: AppState) => state.auth.accessToken);

    useEffect(() => {
        if (accessToken) {
            navigate("/home");
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            dispatch(setAccessToken(response.data.accessToken));
            dispatch(setUserId(response.data.userId));
            NotificationUtils.notifySuccess(translate("LOGIN_SUCCESS"));
            navigate("/home");
        } catch (error) {
            const errors = error.response?.data as CommandResult;
            if (errors) {
                NotificationUtils.notifyError(errors.message);
            } else {
                NotificationUtils.notifyError(error.response.data.message || "Failed to login");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.paper}>
                    <h1 className={styles.heading}>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input className={styles.input} type="email" id="email" name="email" placeholder="Email" />
                        <input className={styles.input} type="password" id="password" name="password" placeholder="Password" />
                        <button type="submit" className={styles.button}>
                            Login
                        </button>
                        <div className={styles.linkBox}>
                            <a href="http://localhost:3000/auth/steam" className={styles.link}>
                                Login with Steam
                            </a>
                        </div>
                    </form>
                    <div className={styles.linkBox}>
                        <p>
                            Nie masz konta?{" "}
                            <RouterLink to="/register" className={styles.link}>
                                Zarejestruj się
                            </RouterLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
