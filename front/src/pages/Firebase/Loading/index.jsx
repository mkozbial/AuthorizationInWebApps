import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FBUserController from '../../../utils/fb_user_controller';
import '../css/Loading.css'; 
import { FBUser } from '../../../utils/fb_user';

const FirebaseLoadingPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="loading-container">
      {loading && <div className="loader"></div>} {}
    </div>
  );
};

export default FirebaseLoadingPage;
