import React from "react";
import "./AuthenticationPage.scss";
import Register from "../../components/Register/index.tsx";

const AuthenticationPage: React.FC = () => {
    return (
        <div className="login-page">
            <div className="login-page__content">
                <Register />
            </div>
        </div>
    );
};

export default AuthenticationPage;