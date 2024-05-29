import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppState } from "../../store/store.ts";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const accessToken = useSelector((state: AppState) => state.auth.accessToken);

    return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
