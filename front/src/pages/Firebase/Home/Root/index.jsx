import React, { useState } from 'react';
import Posts from '../../components/Posts';

function FirebaseRootHomepage() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hello Root!</h1>
            <Posts />
        </div>
    );
}

export default FirebaseRootHomepage;
