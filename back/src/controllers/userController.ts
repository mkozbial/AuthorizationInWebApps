import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};