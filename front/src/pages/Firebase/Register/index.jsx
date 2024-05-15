import React, { useEffect, useState } from 'react';
import FBUserController from '../../../utils/fb_user_controller';
import { useNavigate } from "react-router-dom";
import '../css/AuthPage.css';

const FirebaseRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    try {
       await FBUserController.getInstance().createUserWithEmailAndPassword(email, password);
       navigate('/firebase/main');
    
      setSuccessMessage('Registration successful! You can now log in.');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <div className="auth-container">
            <div className="auth-box">
                <h2>Register</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>
                <p>Already have an account? <a href="/firebase/login">Login here</a></p>
                {error && <div className="error-popup">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        </div>
  );
};

export default FirebaseRegisterPage;
