import React, { useState, useEffect } from 'react';
import FBUserController, { FirebaseUserAccountType } from '../../../utils/fb_user_controller';
import FirebaseUserHomepage from './User';
import { useNavigate } from "react-router-dom";
import FirebaseEditorHomepage from './Editor';
import FirebaseSuperUserHomepage from './Superuser';

function FirebaseHomepage() {
    const user = FBUserController.getInstance().user;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user || !user.accountType) {
            console.log("User or account type is null, redirecting to loading.");
            navigate('/firebase/');
        }
    }, [user, navigate]);

    if (!user || !user.accountType) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <main>
                {user.accountType === FirebaseUserAccountType.USER && (
                    <FirebaseUserHomepage />
                )}
                {user.accountType === FirebaseUserAccountType.EDITOR && (
                    <FirebaseEditorHomepage />
                )}
                {user.accountType === FirebaseUserAccountType.SUPERUSER && (
                    <FirebaseSuperUserHomepage />
                )}
            </main>
        </div>
    );
}

export default FirebaseHomepage;
