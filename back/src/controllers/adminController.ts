import { Request, Response } from 'express';
import { adminService } from '../services/adminService';
import {
	StatusCodes,
} from 'http-status-codes';

export const allUsers = async (req: Request, res: Response) => {
      try {
            const users = await adminService.getUsers();

            res.status(StatusCodes.OK).json({ message: 'Data succesfully received', data : users });

      } catch (error) {
            console.error('Error fetching users:', error);

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching users' });
      }
};

export const modifyUser = async (req: Request, res: Response) => {
      const userId = parseInt(req.params.id, 10);
      const { user_type } = req.body;

      if (!user_type) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request' });
      }

      try {
            const user = await adminService.modifyUser(userId, user_type);

            res.status(StatusCodes.OK).json({ message: 'Data succesfully changed', data: user});
      } catch (error) {
            console.error('Error fetching user:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user' });
      }
};

export const deleteUser = async (req: Request, res: Response) => {
      const userId = parseInt(req.body.user_id, 10);

      try {
            const result = await adminService.deleteUser(userId);

            res.status(StatusCodes.OK).json({ message: 'User succesfully deleted', data: result});
      } catch (error) {
            console.error('Error fetching user:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching user' });
      }
};