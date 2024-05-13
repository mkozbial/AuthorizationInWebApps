// backend/src/routes/authRoutes.ts
import express from 'express';
import { register, login } from '../controllers/authControllers';

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);