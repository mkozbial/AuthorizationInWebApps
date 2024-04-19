import React from "react";
import { Person, Lock } from 'react-bootstrap-icons';
import "./Register.scss";

const Register: React.FC = () => {
    return (
        <div>
            <h2 className="register__heading">Register</h2>
                <p>Create your account</p>
            <form className="register__form"> 
                <div className="register__inputs">
                    <label className="register__label">
                        <Person className="register__icon"/>
                        <input type="text" name="login" className="register__input" placeholder="Username"/>
                    </label>
                    <label className="register__label">
                        <Lock className="register__icon"/>
                        <input type="text" name="password" className="register__input" placeholder="Password" />
                    </label>
                    <label className="register__label">
                        <Lock className="register__icon"/>
                        <input type="text" name="password" className="register__input" placeholder="Repeat password"/>
                    </label>
                </div>   
                <button type="submit" className="register__submit" name="submit" value="Sign me up">Sign me up</button>
                    
            </form>
        </div>
    );
};

export default Register;
