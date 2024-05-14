import { Request, Response } from 'express';
import { postService } from '../services/postService';
import { Post } from '../models/Post';
import {
	StatusCodes,
} from 'http-status-codes';

export const getAllPosts = async (req: Request, res: Response) => {

    try {
        const posts = await postService.getAllPosts();
        res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching posts' });
    }      

};

export const getUserAndPublicPosts = async (req: Request, res: Response) => {
    const userId = parseInt(req.query.user_id as string, 10);
    try {
      const posts = await postService.getUserAndPublicPosts(userId);
      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      console.error('Error fetching user and public posts:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user and public posts' });
    }
  };


export const uploadPost = async(req: Request, res: Response) => {

    const { title, content, visibility, user_id } = req.body;
    try {
        const post = await postService.createPost(title, content, visibility, user_id);
        res.status(StatusCodes.CREATED).json({ message: 'Post uploaded successfully!', post });
    } catch (error) {
        console.error('Error uploading post:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error uploading post' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const postId = req.body.id;
    try {
      await postService.deletePost(postId);
      res.status(StatusCodes.OK).json({ message: 'Post deleted successfully!' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting post' });
    }
};


export const editPost = (req: Request, res: Response) => {


      const id = req.body.id;

      // TODO : EDITION PROCESS

      res.json({"status" :  404});
};