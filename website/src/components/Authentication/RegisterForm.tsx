import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig.ts";
import { NotificationUtils } from "../../utils/notificationUtils.ts";
import styles from "./RegisterForm.module.scss";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const username = data.get("username") as string;

        try {
            await axiosInstance.post("/auth/register", { email, password, username });
            NotificationUtils.notifySuccess("Registered successfully");
            navigate("/login"); // Przekierowanie do strony logowania
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach((err: any) => NotificationUtils.notifyError(err.msg));
            } else {
                NotificationUtils.notifyError(error.response.data.message || "Failed to register");
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.paper}>
                    <h1 className={styles.heading}>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input className={styles.input} type="email" id="email" name="email" placeholder="Email" />
                        <input className={styles.input} type="password" id="password" name="password" placeholder="Password" />
                        <input className={styles.input} type="text" id="username" name="username" placeholder="Username" />
                        <button type="submit" className={styles.button}>
                            Register
                        </button>
                    </form>
                    <div className={styles.linkBox}>
                        <p>
                            Masz już konto?{" "}
                            <RouterLink to="/login" className={styles.link}>
                                Zaloguj się
                            </RouterLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
