import express from 'express';
import { getUserById } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/:id', getUserById);