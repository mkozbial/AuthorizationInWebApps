import React, { useState, useEffect } from 'react';
import FBUserController from '../../../../utils/fb_user_controller';
import Posts from '../../components/Posts';
import SignOut from '../../components/SignOut';

function FirebaseUserHomepage() {
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostVisibility, setNewPostVisibility] = useState('public');
    const [refreshKey, setRefreshKey] = useState(0); // State to force re-render

    const handleNewPostSubmit = async () => {
        try {
            FBUserController.getInstance().addNewPost(newPostTitle, newPostContent, newPostVisibility);
            setNewPostTitle('');
            setNewPostContent('');
            setRefreshKey(refreshKey + 1);
        } catch (error) {
            console.error('Error adding new post:', error);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hello User!</h1>
            <Posts key={refreshKey}/>
            <div>
                <h2 style={{ marginBottom: '10px' }}>Add New Post</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%', padding: '5px' }}
                />
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    style={{ marginBottom: '10px', width: '100%', minHeight: '100px', padding: '5px' }}
                ></textarea>
                <label style={{ marginBottom: '10px' }}>
                    Visibility:
                    <select value={newPostVisibility} onChange={(e) => setNewPostVisibility(e.target.value)} style={{ marginLeft: '10px', padding: '5px' }}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </label>
                <button onClick={handleNewPostSubmit} style={{ margin: '5px', padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
            </div>
            <SignOut />
        </div>
    );

}

export default FirebaseUserHomepage;
