import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('username');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

         fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { token, user } = data;
            console.log(data);
            localStorage.setItem('accessToken', token);
            navigate('/main');
        })
        .catch(error => {
            console.error('There was a problem with the login:', error);
        });
    }
    
    return (
        <div className="login">
            <h2 className="login__heading">LOGIN</h2>
            <p className="login__description">Log into your account</p>
            <form className="login__form"> 
                <div className="login__inputs">
                    <label className="login__label login__label--login">
                        <input
                            type="text"
                            name="login"
                            className="login__input login__input--login"
                            placeholder="Username"
                            value={login}
                            onChange={(e) => {setLogin(e.target.value)}}
                        />
                    </label>
                    <label className="login__label login__label--password">
                        <input
                            type="password"
                            name="password"
                            className="login__input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </label>
                </div>   
                <button
                    type="submit"
                    className="login__submit"
                    name="submit"
                    value="Sign me up"
                    onClick={(e) => {handleSubmit(e)}}
                >
                    Log in
                </button>
            </form>
        </div>
    );
}

export default Login;
