import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {

    const [authorizationStatus, setAuthorizationStatus] = useState<boolean | null>(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("accessToken");

        const isAuthorized = () => {
            return fetch('http://localhost:8080/auth/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${isLoggedIn}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data.data.user_type;
            })
            .then(userType => {
                if (isLoggedIn && allowedRoles?.includes(userType)) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(error => {
                console.error('There was a problem with the login:', error);
                return false;
            });
        }

        isAuthorized()
        .then(authorized => {
            setAuthorizationStatus(authorized);
        })
        .catch(error => {
            console.error('Error during authorization check:', error);
            setAuthorizationStatus(false);
        });
    }, [allowedRoles]);

    if (authorizationStatus === null) {
        return null;
    }

    if (authorizationStatus) {
        return <Outlet />;
    }

    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
        return <Navigate to="/unauthorized" />;
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute;
