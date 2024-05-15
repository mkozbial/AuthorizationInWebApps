import React, { useState } from 'react';
import Posts from '../../components/Posts';

function FirebaseModeratorHomepage() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hello Moderator!</h1>
            <Posts />
        </div>
    );
}

export default FirebaseModeratorHomepage;
