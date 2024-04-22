import React from "react";
import { Person, Lock } from 'react-bootstrap-icons';
import "./Register.scss";

const Register: React.FC = () => {
    return (
        <div className="register">
            <h2 className="register__heading">REGISTER</h2>
            <p className="register__description">Create your account</p>
            <form className="register__form"> 
                <div className="register__inputs">
                    <label className="register__label register__label--login">
                        <input type="text" name="login" className="register__input register__input--login" placeholder="Username"/>
                    </label>
                    <label className="register__label register__label--password">
                        <input type="text" name="password" className="register__input" placeholder="Password" />
                    </label>
                    <label className="register__label register__label--password">
                        <input type="text" name="password" className="register__input" placeholder="Repeat password"/>
                    </label>
                </div>   
                <button type="submit" className="register__submit" name="submit" value="Sign me up">Sign me up</button>
                    
            </form>
        </div>
    );
};

export default Register;
