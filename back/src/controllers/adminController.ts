import { Request, Response } from 'express';
import { adminService } from '../services/adminService';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import {
	StatusCodes,
} from 'http-status-codes';

export const allUsers = async (req: Request, res: Response) => {

      const { user } = req.body;

      const users = await adminService.getUsers();
      console.log(users)

      //const user  = userService.getUserById(1);
    
      // try {
      //   const user = await userService.getUserByUsername(username);
      //   if (!user) {
      //     return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      //   }
        
      //   const passwordMatch = await bcryptjs.compare(password, user.password);
      //   if (!passwordMatch) {
      //     return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
      //   }
    
      //   if (!jwtSecret){
      //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server secret is not set' });
          
      //   }

      //   if (user.user_type != "admin"){
      //       return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'These are not admin credentials' });
      //   }
            
      //   const token = jwt.sign({ userId: user.user_id }, jwtSecret, { expiresIn: '1h' });
    
      //   res.status(StatusCodes.ACCEPTED).json({ message: 'Login successful', token, user });
    
      // } catch (error) {
      //   console.error('Error during login:', error);
      //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error during login' });
      // }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Monkey' });
    };