import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";

type ProtectedRouteProps = {
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const userRole = "admin" //zmienic na endpoint
    const isLoggedIn = localStorage.getItem("accessToken");

    const isAuthorized = () => {
        if (isLoggedIn && allowedRoles?.includes(userRole)) {
            return true;
        }

        return false;
    }

    if (isAuthorized()) return <Outlet />
    if (isLoggedIn) return <Navigate to="/unauthorized" />
    return <Navigate to="/" />
            
}

export default ProtectedRoute;