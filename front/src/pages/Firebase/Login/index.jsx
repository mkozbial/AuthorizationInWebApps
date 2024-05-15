import React, { useEffect, useState } from 'react';
import FBUserController from '../../../utils/fb_user_controller';
import { useNavigate } from "react-router-dom";
import '../css/AuthPage.css';
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
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an account? <a href="/firebase/register">Register here</a></p>
                {error && <div className="error-popup">{error}</div>}
            </div>
        </div>
  );
};

export default FirebaseLoginPage;
