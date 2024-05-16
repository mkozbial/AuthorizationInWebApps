import React from 'react';
import FBUserController from '../../../utils/fb_user_controller';
import '../css/SignOut.css';

const SignOut = () => {

  const handleSignOut = async () => {
    try {
      await FBUserController.getInstance().signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
    </div>

  );
};

export default SignOut;
