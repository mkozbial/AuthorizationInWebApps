import React, { useEffect, useState } from 'react';
import FBUserController from '../../../utils/fb_user_controller';
import { useNavigate } from "react-router-dom";
import '../css/AuthPage.scss';
import { FBUser } from '../../../utils/fb_user';
const FirebaseLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await FBUserController.getInstance().signInWithEmailAndPassword(email, password);
      navigate('/firebase/main');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                <input className="auth__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input  className="auth__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button  className="auth__button" onClick={handleLogin}>Login</button>
                <p  className="auth__p">Don't have an account? <a  className="auth__a" href="/firebase/register">Register here</a></p>
                {error && <div className="error-popup">{error}</div>}
            </div>
        </div>
  );
};

export default FirebaseLoginPage;
