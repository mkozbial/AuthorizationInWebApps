import React, { useEffect, useState } from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactComponent as Trash} from "../../assets/icons/trash.svg";
import { ReactComponent as Pen } from "../../assets/icons/pencil-square.svg";
import { ReactComponent as X } from "../../assets/icons/x-lg.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import "./MainPage.scss";
import UseGetUser from "../../hooks/useGetUser.tsx";
import * as Checkbox from '@radix-ui/react-checkbox';
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [visibilty, setVisibilty] = useState("public");
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newVisibility, setNewVisibility] = useState("public");
    const { userId, userType, isAdult } = UseGetUser();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    function sendPost(postVisibility: string, content: string, title: string) {
        const url = 'http://localhost:8080/posts/upload';
        const token = localStorage.getItem("accessToken");


        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content,
                visibility: postVisibility,
                adult: isChecked
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            getPostsList();
            return data;
        })
        .catch(error => {
            console.error('There was a problem sending post:', error);
            throw error;
        });
    }

    function getPostsList() {
        const token = localStorage.getItem("accessToken");
        const url = 'http://localhost:8080/posts/';

        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setPosts(data);
                return data;
            } else {
                throw new Error('Invalid response format');
            }
        })
        .catch(error => {
            console.error('There was a problem getting posts:', error);
            throw error;
        });
    }

    function editPost(postID: string, postNewTitle: string, postNewContent: string, visibility: string) {
        const url = 'http://localhost:8080/posts/edit';
        const token = localStorage.getItem("accessToken");

        getPostsList();
        setNewTitle("");
        setNewContent("");
        setNewVisibility("");

        const data = {
            post_id: postID,
            ...(postNewTitle && { title: postNewTitle }),
            ...(postNewContent && { content: postNewContent }),
            ...(visibility && { visibility: visibility })
        };

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('There was a problem sending post:', error);
            throw error;
        });
    }

    function deletePost(postID: string) {
        const url = 'http://localhost:8080/posts/delete';
        const token = localStorage.getItem("accessToken");

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post_id: postID,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            getPostsList();
            return data;
        })
        .catch(error => {
            console.error('There was a problem deleting post:', error);
            throw error;
        });
    }

    const handleAdminPanelButton = () => {
        navigate("/admin-panel");
    }

    const handleEditPost = (postID: string, postNewTitle: string, postNewContent: string, visibility: string) => {
    editPost(postID, postNewTitle, postNewContent, visibility)
        .then(() => {
            getPostsList();
        })
        .catch(error => {
            console.error("Error while deleting user:", error);
        });
    };

    useEffect(() => {
        getPostsList();
    }, []);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
    };
    return (
        <Dialog.Root>
            <div className="main-page">
                <p className="main-page__heading">Main Page</p>
                {userType === "admin" && <button onClick={() => {handleAdminPanelButton()}} className="main-page__nav">Admin Panel</button>}
                <div className="post">
                    <textarea
                        name="title"
                        cols={40}
                        rows={1}
                        className="post__title"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        maxLength={70}
                    />
                    <textarea
                        name="content"
                        cols={40}
                        rows={5}
                        className="post__input"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        maxLength={500}
                    />
                    <div className="post__controls">
                        {isAdult && <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox.Root className="register__checkbox-root" id="c1" onCheckedChange={handleCheckboxChange}>
                            <Checkbox.Indicator className="register__checkbox-indicator" >
                                <Check className="register__checkbox-check"/>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label" htmlFor="c1">
                            18+
                        </label>
                        </div>}
                        <RadioGroup.Root className="post-radio" defaultValue="default" aria-label="View density">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <RadioGroup.Item className="post-radio__item" value="default" id="r1" onClick={() => { setVisibilty("public"); }}>
                                <RadioGroup.Indicator className="post-radio__indicator" />
                                </RadioGroup.Item>
                                <label className="post-radio__label" htmlFor="r1">
                                    Public
                                </label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <RadioGroup.Item className="post-radio__item" value="comfortable" id="r2" onClick={() => { setVisibilty("private"); }}>
                                <RadioGroup.Indicator className="post-radio__indicator" />
                                </RadioGroup.Item>
                                <label className="post-radio__label" htmlFor="r2">
                                    Private
                                </label>
                            </div>
                        </RadioGroup.Root>
                        <button onClick={() => { sendPost(visibilty, content, title); }} type="submit" className="post__button">
                            Send
                        </button>
                    </div>
                    
                </div>
                <div className="posts-list">
                    <p className="posts-list__heading">Posts</p>
                    {posts.map((post, index) => (
                        <>
                        <div className="posts-list__post" key={index}>
                            <div >
                                <div className="posts-list__post-title">{post.title}</div>
                                <div className="posts-list__post-content">{post.content}</div>
                            </div>
                            <div className="posts-list__icons">
                                {(post.user_id === userId || userType === "admin" || userType === "editor") &&
                                    <>
                                        {post.adult && <p>18+</p>}
                                        <Dialog.Trigger asChild>
                                            <Pen className="posts-list__icon" onClick={() => { setSelectedPost(post.post_id); }} />
                                        </Dialog.Trigger>
                                        <Trash className="posts-list__icon" onClick={() => { setSelectedPost(post.post_id); deletePost(post.post_id);  }} />
                                    </>
                                }
                            </div>
                        </div>
                            <Dialog.Portal>
                                <Dialog.Overlay className="dialog__overlay"/>
                                <Dialog.Content className="dialog__content">
                                    <Dialog.Title className="dialog__title">Edit post</Dialog.Title>
                                    <Dialog.Description className="dialog__description">
                                        Make changes to your post here. Click save when you're done.
                                    </Dialog.Description>
                                    <fieldset className="dialog__fieldset">
                                        <form>
                                            <div className="post-dialog__field">
                                                <label className="post-dialog__label" htmlFor="name">
                                                    Title
                                                </label>
                                                <textarea
                                                    name="title"
                                                    cols={40}
                                                    rows={1}
                                                    className="post-dialog__title"
                                                    onChange={(e) => setNewTitle(e.target.value)}
                                                    placeholder="Title"
                                                    maxLength={70}
                                                />
                                            </div>
                                            <div className="post-dialog__field">
                                                <label className="post-dialog__label" htmlFor="name">
                                                    Content
                                                </label>
                                                <textarea
                                                    name="content"
                                                    cols={40}
                                                    rows={5}
                                                    className="post-dialog__content"
                                                    onChange={(e) => setNewContent(e.target.value)}
                                                    placeholder="Content"
                                                    maxLength={500}
                                                />
                                            </div>
                                            <div className="post-dialog__field">
                                                <label className="post-dialog__label" htmlFor="name">
                                                    Visibility
                                                </label>
                                                <RadioGroup.Root className="post-radio" defaultValue="default" aria-label="View density">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <RadioGroup.Item className="post-radio__item" value="default" id="r1" onClick={() => { setNewVisibility("public"); }}>
                                                    <RadioGroup.Indicator className="post-radio__indicator" />
                                                    </RadioGroup.Item>
                                                    <label className="post-radio__label" htmlFor="r1">
                                                        Public
                                                    </label>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <RadioGroup.Item className="post-radio__item" value="comfortable" id="r2" onClick={() => { setNewVisibility("private"); }}>
                                                    <RadioGroup.Indicator className="post-radio__indicator" />
                                                    </RadioGroup.Item>
                                                    <label className="post-radio__label" htmlFor="r2">
                                                        Private
                                                    </label>
                                                </div>
                                                </RadioGroup.Root>
                                            </div>
                                        </form>
                                    </fieldset>
                                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                        <Dialog.Close asChild>
                                                <button className="dialog__button" onClick={() => { handleEditPost(selectedPost, newTitle, newContent, newVisibility); }}>Save changes</button>
                                        </Dialog.Close>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button className="dialog__x-button" aria-label="Close">
                                            <X />
                                        </button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </>
                    ))}
                </div>
            </div>
        </Dialog.Root>
    );
}

export default MainPage;
