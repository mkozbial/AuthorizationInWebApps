import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { userService } from '../services/userService';
import { Post } from '../models/Post';
import {
	StatusCodes,
} from 'http-status-codes';
import { User } from 'models/User';

export const getPosts = async (req: Request, res: Response) => {
    const userId = req.body.user.userId;
    const userRole = (await userService.getUserById(userId)).user_type;
    const isUserAdult = (await userService.getUserById(userId)).adult;

    try {
        let posts;
        if (userRole === 'admin' || userRole === 'editor') {
            posts = await postService.getAllPosts();
        } else if (isUserAdult === false) {
            posts = await postService.getUserAndPublicPostsNotForAdults(userId);
        } else {
            posts = await postService.getUserAndPublicPosts(userId);
        }
        res.status(StatusCodes.OK).json(posts);

    } catch (error){
        console.error('Error fetching posts:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching posts' });
    }
};

export const uploadPost = async(req: Request, res: Response) => {

    const { title, content, visibility, adult} = req.body;
    const user_id = req.body.user.userId;
    try {
        const post = await postService.createPost(title, content, visibility, user_id, adult);
        res.status(StatusCodes.CREATED).json({ message: 'Post uploaded successfully!', post });
    } catch (error) {
        console.error('Error uploading post:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error uploading post' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const postId = parseInt(req.body.post_id, 10);
    const userId = req.body.user.userId;
    try {
        const post = await postService.getPostById(postId);
    
        if (!post || post.user_id !== userId) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not allowed to delete this post' });
        }
    
        await postService.deletePost(postId);
        res.status(StatusCodes.OK).json({ message: 'Post deleted successfully!' });

    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting post' });
    }
};


export const editPost = async (req: Request, res: Response) => {
    const postId = parseInt(req.body.post_id, 10);
    const { title, content, visibility } = req.body;
    const userId = req.body.user.userId;
    
    try {
        const user = await userService.getUserById(userId);
        const post = await postService.getPostById(postId);
        console.log(canEdit(user))
    
        if ((!post || post.user_id !== userId) && !canEdit(user)) {
          return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not allowed to edit this post' });
        }
    
        const updatedFields: any = {};
        if (title) updatedFields.title = title;
        if (content) updatedFields.content = content;
        if (visibility) updatedFields.visibility = visibility;
    
        if (Object.keys(updatedFields).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No fields to update' });
        }
  
        await postService.editPost(postId, updatedFields);
        res.status(StatusCodes.OK).json({ message: 'Post edited successfully!' });
    } catch (error) {
        console.error('Error editing post:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error editing post' });
    }
};

function canEdit(user : User): boolean {

    const allowedRoles = ["admin", "editor"]
    
    if (!user)
        return false;

    if (!allowedRoles.includes(user.user_type))
        return false;

    return true;
}