import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FBUserController from '../../../utils/fb_user_controller';

function EditPostModal(props) {
    const [editedPost, setEditedPost] = useState(props.post);
    
    useEffect(() => {
        setEditedPost(props.post || { title: '', text: '' });
    }, [props.post]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost({ ...editedPost, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Updated post:', editedPost);
        FBUserController.getInstance().updatePost(editedPost);
        props.onClose();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            contentLabel="Edit Post"
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    width: '80%',
                    maxWidth: '400px',
                    margin: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '15px',
                    maxHeight: '40vh',
                },
            }}
        >
            <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Edit Post</h2>
            <label>Title:</label>
            <input type="text" name="title" value={editedPost == null ? "" : editedPost.title} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', padding: '5px' }} />
            <label>Content:</label>
            <textarea name="text" value={editedPost == null ? "" : editedPost.text} onChange={handleInputChange} style={{ marginBottom: '10px', width: '100%', minHeight: '100px', padding: '5px' }}></textarea>
            <div style={{ textAlign: 'center' }}>
                <button onClick={handleSubmit} style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Changes</button>
                <button onClick={props.onClose} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
            </div>
        </Modal>
    );
};

export default EditPostModal;