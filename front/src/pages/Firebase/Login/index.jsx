import React, { useState } from 'react';
import FBUserController from '../../../utils/fb_user_controller';
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit" className="btn-signin">Sign In</button>
      </form>
      {error && <div className="error-popup">{error}</div>}
    </div>
  );
};

export default FirebaseLoginPage;
