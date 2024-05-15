import React, { useState } from "react";
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import "./Register.scss";

const Register: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    const [validMessage, setValidMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        validatePassword(password);
        
        console.log(isChecked);

        if (!validPassword) {
            return;
        }
        
        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login,
                password: password,
                user_type: 'user',
                adult: isChecked
            }),
        })
            .then(response => {

            if (!response.ok) {
                setMessage("Username is already used")
            } else {
                setMessage("Successfully Registered! You can now log in")
            }
        })
        .catch(error => {
            console.error('There was a problem with the registration:', error);
        });
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

        return validPassword;
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
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
                            onChange={(e) => { setLogin(e.target.value) ; setMessage(""); }}
                        />
                    </label>
                    <label className="register__label register__label--password">
                        <input
                            type="password"
                            name="password"
                            className="register__input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); setMessage(""); }}
                        />
                    </label>
                    <label className="register__label register__label--password">
                        <input
                            type="password"
                            name="password"
                            className="register__input"
                            placeholder="Repeat password"
                            value={repPassword}
                            onChange={(e) => { setRepPassword(e.target.value);  validatePassword(e.target.value); setMessage(""); }}
                        />
                    </label>
                    <label className="register__label">
                       <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox.Root className="register__checkbox-root" id="c1" onCheckedChange={handleCheckboxChange}>
                            <Checkbox.Indicator className="register__checkbox-indicator" >
                                <Check className="register__checkbox-check"/>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label" htmlFor="c1">
                            I am an adult
                        </label>
                        </div>
                    </label>
                    {password !== repPassword && <p className="register__match">Passwords don't match</p>}
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
                    disabled={password !== repPassword || !validPassword}
                >
                    Sign me up
                </button>
                {message}
            </form>
        </div>
    );
};

export default Register;
