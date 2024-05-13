import React, { useState } from "react";
import axios from "axios";
import * as Tooltip from '@radix-ui/react-tooltip';
import "./Register.scss";

const Register: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    const [validMessage, setValidMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

       validatePassword(password);

        if (!validPassword) {
            return;
        }
        
        const configuration = {
            method: "post",
            url: "localhost:8080/auth/register",
            data: {
                login,
                password
            }
        };
    }
    const validatePassword = (password) => {
        let message = ""
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength)
            message += "Too short;"
        if (!hasUpperCase)
            message += " Upper Case Letter Missing;"
        if (!hasLowerCase)
            message += " Lower Case Letter Missing;"
        if (!hasDigit)
            message += " Digit Missing;"
        if (!hasSpecialChar)
            message += " Special Character Missing;"

        setValidPassword (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasDigit &&
            hasSpecialChar
        );

        setValidMessage(message);
    };

    return (
        <div className="register">
            <h2 className="register__heading">REGISTER</h2>
            <p className="register__description">Create your account</p>
            <form className="register__form"> 
                <div className="register__inputs">
                    <label className="register__label register__label--login">
                        <input
                            type="text"
                            name="login"
                            className="register__input register__input--login"
                            placeholder="Username"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </label>
                    <label className="register__label register__label--password">
                        <input
                            type="password"
                            name="password"
                            className="register__input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setValidPassword(true);}}
                        />
                    </label>
                    <label className="register__label register__label--password">
                        <input
                            type="password"
                            name="password"
                            className="register__input"
                            placeholder="Repeat password"
                            value={repPassword}
                            onChange={(e) => { setRepPassword(e.target.value); setValidPassword(true);}}
                        />
                    </label>
                    {password !== repPassword && <p>Passwords don't match</p>}
                    {!validPassword &&
                        <div className="register__invalid">
                            <Tooltip.Provider>
                                <Tooltip.Root>
                                    <Tooltip.Trigger className="register__tooltip">
                                        <p className="register__invalid__icon">!</p>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                    <Tooltip.Content className="register__tooltip__content" sideOffset={5} side="bottom">
                                        {validMessage}
                                        <Tooltip.Arrow className="register__tooltip__arrow"/>
                                    </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            </Tooltip.Provider>
                            <p className="register__invalid__text">Password doesn't meet requirements</p>
                        </div>
                    }
                </div>   
                <button
                    type="submit"
                    className="register__submit"
                    name="submit"
                    value="Sign me up"
                    onClick={(e) => handleSubmit(e)}
                    disabled={password !== repPassword}
                >
                    Sign me up
                </button>
            </form>
        </div>
    );
};

export default Register;
