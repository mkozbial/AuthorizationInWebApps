import { Request, Response } from 'express';
import { userService } from '../services/userService';
import {
	StatusCodes,
} from 'http-status-codes';

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.getUserById(userId);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user' });
  }
};