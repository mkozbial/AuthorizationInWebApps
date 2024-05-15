import React, { useState, useEffect } from "react";
import Authorization from "./AuthorizationPage/index.tsx";
import MainPage from "./MainPage/index.tsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/index.tsx";
import USER_ROLES from "../utils/consts/intex.tsx";
import Unauthorized from "./Unauthorized/index.tsx";
import AdminPage from "./AdminPage/index.tsx";
import FirebaseLoginPage from "./Firebase/Login/index.jsx";
import FirebaseRegisterPage from "./Firebase/Register/index.jsx";
import FirebaseHomepage from "./Firebase/Home/index.jsx";
import { AuthProvider } from 'firebase/auth';
import FirebaseLoadingPage from "./Firebase/Loading/index.jsx";
import FBUserController from "../utils/fb_user_controller.js";
import { FBUser } from "../utils/fb_user.js";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = () => {
      return FBUserController.getInstance().auth.onAuthStateChanged(async function(user) {
        console.log("Binding");
        if (user) {
          console.log("New user state detected");
          const userDoc = await FBUserController.getInstance().usersCollection.doc(user.uid).get();
          if (userDoc.exists) {
            const serializedUser = userDoc.data();
            FBUserController.getInstance().user = FBUser.deserialize(user.uid, serializedUser);
            navigate('/firebase/main/');
          } 
        } else {
          console.log("User is signed out");
          if (location.pathname != "/firebase/login/" && location.pathname != "/firebase/register") {
            navigate('/firebase/login/');
          }
        }
      });
    };

    const unsubscribeHandler = unsubscribe();

    return () => {
      unsubscribeHandler();
    };
  }, [navigate]);

    return (
        <Routes>
            {/* public */}
            <Route path="/" element={<Authorization />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/firebase/" element={<FirebaseLoadingPage />} />
            {/* should be protected */}
            <Route path="/firebase/login" element={<FirebaseLoginPage />} />
            <Route path="/firebase/register" element={<FirebaseRegisterPage />} />
            <Route path="/firebase/main" element={<FirebaseHomepage />} />
            {/* protected */}
            <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.USER, USER_ROLES.EDITOR, USER_ROLES.ADMIN]} />}>
                <Route path="/main" element={<MainPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
                <Route path="/admin-panel" element={<AdminPage />} />
            </Route>
        </Routes>
    );
};

export default App;

// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error("Function not implemented.");
// }
