import React, { useState } from 'react';
import Posts from '../../components/Posts';
import SignOut from '../../components/SignOut';
import FBUserController from '../../../../utils/fb_user_controller';

function FirebaseSuperUserHomepage() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        FBUserController.getInstance().updateUserRole(email, role)
            .then(() => {
                alert('User role updated successfully!');
            })
            .catch((error) => {
                alert(`Error updating user role: ${error.message}`);
            });
            setRole('User');
            setEmail('');
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hello SuperUser!</h1>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        <option value="user">User</option>
                        <option value="editor">Editor</option>
                        <option value="superuser">SuperUser</option>
                    </select>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Submit
                    </button>
                </div>
            </form>
            
            <Posts />
            <SignOut />
        </div>
    );
}

export default FirebaseSuperUserHomepage;
