import React, { useState } from "react";
import Authorization from "./AuthorizationPage/index.tsx";
import UserPage from "./UserPage/index.tsx";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth/index.tsx";
import USER_ROLES from "../utils/consts/intex.tsx";
import Unauthorized from "./Unauthorized/inedx.tsx";

const App: React.FC = () => {

    return (
        <Routes>
            {/* public */}
            <Route path="/" element={<Authorization />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            
            {/* protected */}
            <Route element={<RequireAuth allowedRoles={[USER_ROLES.USER, USER_ROLES.EDITOR]} />}>
                <Route path="/main" element={<UserPage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
                <Route path="/admin-panel" element={<UserPage />} />
            </Route>
        </Routes>
    );
};

export default App;