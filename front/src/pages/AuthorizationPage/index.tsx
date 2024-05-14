import React, { useState } from "react";
import "./AuthorizationPage.scss";
import Register from "../../components/Register/index.tsx";
import Login from "../../components/Login/index.tsx";

const Authorization: React.FC<AuthorizationProps> = ({ setUser }) => {
    const [displayedView, setDisplayedView] = useState("login");
    const heading = displayedView === "login" ? "Not a member?" : "Already have an account?";
    const btnText = displayedView === "login" ? "Register" : "LOGIN";
    
    function handleChange() {
        if (displayedView === "login") {
            setDisplayedView("register");
        } else {
            setDisplayedView("login");
        }
    }
    return (
        <div className="authetication-page">
            <div className={`authetication-page__content authetication-page__content--${displayedView}`}>
                {displayedView === "login" ? (
                    <Login setUser={setUser}/>
                ): (
                    <Register />
                )}
            
                <div className="authetication-page__switch">
                    <div className="authetication-page__divider" ></div>
                    <p className="authetication-page__heading">{heading}</p>
                    <button className="authetication-page__button" onClick={handleChange}>{btnText}</button>
                </div>
            </div>
        </div>
    );
};

export default Authorization;