import React, { useState } from "react";
import Authorization from "./AuthorizationPage/index.tsx";

const App: React.FC = () => {
    const [user, setUser] = useState({ auth: false, username: "" })

    return (
        <div className="my-app">
            {user.auth ? 
                <div></div> :
                <Authorization setUser={setUser}/>
            }
        </div>
    );
};

export default App;