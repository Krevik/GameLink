import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "./main.scss";
import Users from "./pages/Users.tsx";
import Games from "./pages/Games.tsx";
import Home from "./pages/Home.tsx";
import { Provider, useSelector } from "react-redux";
import store, { AppState } from "./store/store.ts";
import LoginForm from "./components/LoginForm.tsx";
import RegisterForm from "./components/RegisterForm.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Notification from "./components/Notification.tsx";
import { setAccessToken, setUserId } from "./store/authSlice.ts";
import "./main.scss";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import { MyProfile } from "./pages/MyProfile/MyProfile.tsx";
import { PagePaths } from "./utils/pagePaths.ts";
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const App: React.FC = () => {
    const accessToken = useSelector((state: AppState) => state.auth.accessToken);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userIdFromStorage = localStorage.getItem("userId");
        if (token) {
            store.dispatch(setAccessToken(token));
        }
        if (userIdFromStorage) {
            store.dispatch(setUserId(Number(userIdFromStorage)));
        }
    }, []);

    return (
        <Router>
            <Notification />
            <Routes>
                <Route path="/" element={<Navigate to={accessToken ? "/home" : "/login"} />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                    path={PagePaths.HOME}
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={PagePaths.USERS}
                    element={
                        <PrivateRoute>
                            <Users />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={PagePaths.GAMES}
                    element={
                        <PrivateRoute>
                            <Games />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={PagePaths.MY_PROFILE}
                    element={
                        <PrivateRoute>
                            <MyProfile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
