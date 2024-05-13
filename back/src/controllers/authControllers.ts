// backend/src/controllers/authControllers.ts
import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userService.createUser(username, password);
    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
};