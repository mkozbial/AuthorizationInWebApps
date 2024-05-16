import React, { useState } from 'react';
import Posts from '../../components/Posts';
import SignOut from '../../components/SignOut';

function FirebaseEditorHomepage() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Hello editor!</h1>
            <Posts />
            <SignOut />
        </div>
    );
}

export default FirebaseEditorHomepage;
