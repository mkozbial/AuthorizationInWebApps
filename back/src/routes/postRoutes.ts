import express from 'express';
import { deletePost, editPost, getAllPosts, uploadPost } from '../controllers/postController';

export const postRouter = express.Router();


postRouter.get('/', getAllPosts);
postRouter.post('/upload', uploadPost);
postRouter.delete('/delete', deletePost);
postRouter.put('/edit', editPost);