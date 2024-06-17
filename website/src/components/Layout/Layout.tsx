import React, { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./Layout.css";
import store, { AppState } from "../../store/store.ts";
import { clearAccessToken, clearUserId } from "../../store/slices/authSlice.ts";
import { translate } from "../../utils/translation/TranslationUtils.ts";
import { PagePaths } from "../../utils/pagePaths.ts";
import { MessagesComponent } from "../Messages/MessagesComponent.tsx";
import { useSelector } from "react-redux";

const Layout = (props: PropsWithChildren) => {
    const navigate = useNavigate();
    const currentLoggedInUserId: number | null = useSelector((state: AppState) => state.auth.userId);

    const handleLogout = () => {
        store.dispatch(clearAccessToken());
        store.dispatch(clearUserId());
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">
                        {translate("GAME_LINK")}
                    </Link>
                </div>
                <div className="navbar-menu">
                    <Link to={PagePaths.HOME} className="navbar-item">
                        Home
                    </Link>
                    <Link to={PagePaths.USERS} className="navbar-item">
                        Users
                    </Link>
                    <Link to={"/friends"} className="navbar-item">
                        Friends
                    </Link>
                    <Link to={PagePaths.GAMES} className="navbar-item">
                        Games
                    </Link>
                    <Link to={`/profile/${currentLoggedInUserId}`} className="navbar-item">
                        My Profile
                    </Link>
                </div>
                <Button label="Logout" icon="pi pi-sign-out" className="p-button-danger" onClick={handleLogout} />
            </nav>
            <main className="container">{props.children}</main>
            <MessagesComponent />
        </div>
    );
};

export default Layout;
