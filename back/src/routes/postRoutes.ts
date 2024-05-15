import express from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { deletePost, editPost, getPosts, uploadPost } from '../controllers/postController';

export const postRouter = express.Router();


postRouter.get('/', verifyToken, getPosts);
postRouter.post('/upload', verifyToken, uploadPost);
postRouter.delete('/delete', verifyToken, deletePost);
postRouter.put('/edit', verifyToken, editPost);