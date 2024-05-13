// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import { userService } from '../services/userService';
import bcryptjs from 'bcryptjs';


export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await userService.createUser(username, hashedPassword);
    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
};