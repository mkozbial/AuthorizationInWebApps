import React, { useState } from 'react';
import FBUserController from '../../../utils/fb_user_controller';
import { useNavigate } from "react-router-dom";

const FirebaseRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    try {
       await FBUserController.getInstance().createUserWithEmailAndPassword(email, password);
    
      setSuccessMessage('Registration successful! You can now log in.');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-register">Register</button>
      </form>
      {error && <div className="error-popup">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default FirebaseRegisterPage;
