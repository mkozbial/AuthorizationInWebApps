import React, { createContext, useState } from "react";

type User = {
  username: string;
  password: string;
  role: string;
  accessToken: string;
}

type AuthContextType = {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User>>;
};

const AuthContext = createContext<AuthContextType>({
    auth: {username: "", password: "", role: "", accessToken: ""},
    setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({username: "", password: "", role: "", accessToken: ""});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;