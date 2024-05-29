import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserId } from "../store/slices/authSlice.ts";
import axios from "axios";
import { Container, TextField, Button, Typography, Link, Box, Paper } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/notificationUtils";
import axiosInstance from "../api/axiosConfig.ts";
import { AppState } from "../store/store.ts";
import { translate, TranslationUtils } from "../utils/translation/TranslationUtils.ts";

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
            notifySuccess(translate("LOGIN_SUCCESS"));
            navigate("/home");
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach((err: any) => notifyError(err.msg));
            } else {
                notifyError(error.response.data.message || "Failed to login");
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Paper elevation={3} style={{ padding: "2rem", width: "100%" }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth id="email" name="email" label="Email" margin="normal" variant="outlined" />
                        <TextField fullWidth id="password" name="password" label="Password" type="password" margin="normal" variant="outlined" />
                        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: "1rem" }}>
                            Login
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Link href="http://localhost:3000/auth/steam">Login with Steam</Link>
                        </Box>
                    </form>
                    <Box mt={2} textAlign="center">
                        <Typography>
                            Nie masz konta?{" "}
                            <Link component={RouterLink} to="/register">
                                Zarejestruj się
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginForm;
