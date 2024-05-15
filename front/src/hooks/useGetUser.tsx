import { useState, useEffect } from "react";

const UseGetUser = () => {
    const token = localStorage.getItem("accessToken");
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!token) {
            console.error('Access token not found.');
            return;
        }

        fetch('http://localhost:8080/auth/token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserType(data.data.user_type);
            setUserId(data.data.user_id);
            setUsername(data.data.username);
        })
        .catch(error => {
            console.error('There was a problem with fetching user info:', error);
        });
    }, [token]);

    return { userType, userId, username };
}

export default UseGetUser;
