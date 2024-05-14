import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.tsx";
import React from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
    allowedRoles.includes(auth?.role)
        ? <Outlet /> :
        // auth?.username ?
         <Navigate to="/unauthorized" state={{ from: location }} replace />
        // : <Navigate to="/" state={{ from: location }} replace />
);
}

export default RequireAuth;