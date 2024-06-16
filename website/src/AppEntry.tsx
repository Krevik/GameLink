import { PagePaths } from "./utils/pagePaths.ts";
import React, { ReactElement } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute.tsx";
import { useSelector } from "react-redux";
import { AppState } from "./store/store.ts";
import { useAuthenticationTokenSyncer } from "./store/hooks/useAuthenticationTokenSyncer.ts";
import Notification from "./components/Notification/Notification.tsx";
import LoginForm from "./components/Authentication/LoginForm.tsx";
import RegisterForm from "./components/Authentication/RegisterForm.tsx";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import Games from "./pages/Games.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";

const createRoute = (path: keyof typeof PagePaths, element: ReactElement, shouldBeProtectedByAuthentication: boolean = false) => {
    return <Route path={path} element={shouldBeProtectedByAuthentication ? <PrivateRoute>{element}</PrivateRoute> : element} />;
};

const AppEntry = () => {
    const accessToken = useSelector((state: AppState) => state.auth.accessToken);

    useAuthenticationTokenSyncer();

    return (
        <Router>
            <Notification />
            <Routes>
                <Route path="/" element={<Navigate to={accessToken ? "/home" : "/login"} />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/profile/:userId" element={<Profile />} />
                {createRoute("HOME", <Home />, true)}
                {createRoute("USERS", <Users />, true)}
                {createRoute("GAMES", <Games />, true)}
                {/*{createRoute("MYPROFILE", <MyProfile />, true)}*/}
            </Routes>
        </Router>
    );
};

export default AppEntry;
