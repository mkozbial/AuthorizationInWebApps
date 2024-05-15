import { useEffect, useState } from "react";
import FBUserController, { FirebaseUserAccountType } from "../../../utils/fb_user_controller";
import EditPostModal from "./EditPostModal";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchData = async () => {
        try {
            const postsData = await FBUserController.getInstance().getPosts();
            console.log(postsData);
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditPost = (post) => {
        setSelectedPost(post);
        console.log(post);
        console.log(selectedPost);
        setEditModalOpen(true);
    };

    const handleRemovePost = (post) => {
        FBUserController.getInstance().removePost(post);
        fetchData();
    }

    const handleEditModalClose = () => {
        setEditModalOpen(false);
        fetchData();
    };


    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ marginBottom: '10px' }}>Posts</h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {posts != null && posts.length > 0 && posts.map(post => (
                        <div key={post.postId} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                            <h3 style={{ marginBottom: '5px' }}>{post.title}</h3>
                            <p style={{ marginBottom: '5px', fontSize: '14px' }}>{post.text}</p>
                            <p style={{ marginBottom: '5px', fontSize: '12px' }}>Added by User ID: {post.userId}</p>
                            <p style={{ marginBottom: '5px', fontSize: '12px' }}>Visibility: {post.visibility}</p>
                            {(FBUserController.getInstance().user.accountType == FirebaseUserAccountType.ROOT || post.userId === FBUserController.getInstance().user.uid) && (
                                <button onClick={() => handleEditPost(post)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                            )}
                            {(FBUserController.getInstance().user.accountType == FirebaseUserAccountType.ROOT || FBUserController.getInstance().user.accountType == FirebaseUserAccountType.MODERATOR || post.userId === FBUserController.getInstance().user.uid) && (
                                <button onClick={() => handleRemovePost(post)} style={{ padding: '5px 10px', backgroundColor: '#DC143C', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <EditPostModal isOpen={editModalOpen} onClose={handleEditModalClose} post={selectedPost} />
        </div>
    );
}
