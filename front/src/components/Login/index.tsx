import React, { useState } from "react";
import "./Login.scss";

const Login: React.FC<AuthorizationProps> = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    
    return (
        <div className="login">
            <h2 className="login__heading">LOGIN</h2>
            <p className="login__description">Log into your account</p>
            <form className="login__form"> 
                <div className="login__inputs">
                    <label className="login__label login__label--login">
                        <input type="text" name="login" className="login__input login__input--login" placeholder="Username"/>
                    </label>
                    <label className="login__label login__label--password">
                        <input type="text" name="password" className="login__input" placeholder="Password" />
                    </label>
                </div>   
                <button type="submit" className="login__submit" name="submit" value="Sign me up">Log in</button>
                    
            </form>
        </div>
    );
}

export default Login;
