import express from 'express';
import { register, login, retriveUser } from '../controllers/authControllers';
import { verifyToken } from '../middleware/verifyToken';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/token', verifyToken, retriveUser);