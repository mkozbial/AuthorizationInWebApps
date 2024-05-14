import React, { useState } from "react";
import Authorization from "./AuthorizationPage/index.tsx";
import UserPage from "./UserPage/index.tsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/index.tsx";
import USER_ROLES from "../utils/consts/intex.tsx";
import Unauthorized from "./Unauthorized/index.tsx";
import AdminPage from "./AdminPage/index.tsx";

const App: React.FC = () => {

    return (
        <Routes>
            {/* public */}
            <Route path="/" element={<Authorization />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* protected */}
            <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.USER, USER_ROLES.EDITOR, USER_ROLES.ADMIN]} />}>
                <Route path="/main" element={<UserPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
                <Route path="/admin-panel" element={<AdminPage />} />
            </Route>
        </Routes>
    );
};

export default App;

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
