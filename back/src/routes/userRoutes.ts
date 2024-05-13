import express from 'express';
import { getUserById } from '../controllers/userController';
import { verifyToken } from '../middleware/verifyToken';

export const userRouter = express.Router();

userRouter.get('/:id', verifyToken,  getUserById);