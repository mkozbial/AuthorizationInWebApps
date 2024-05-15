import { Request, Response } from 'express';
import { userService } from '../services/userService';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import {
	StatusCodes,
} from 'http-status-codes';

export const register = async (req: Request, res: Response) => {
  	const { username, password } = req.body;

	try {
		const hashedPassword = await bcryptjs.hash(password, 10);
		const user = await userService.createUser(username, hashedPassword);  
		res.status(StatusCodes.CREATED).json({ message: 'User registered successfully!', user });
	} catch (error) {
		console.error('Error during registration:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error during registration' });
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await userService.getUserByUsername(username);
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
		}
		
		const passwordMatch = await bcryptjs.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
		}

		if (!jwtSecret){
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server secret is not set' });
			
		}
			
		const token = jwt.sign({ userId: user.user_id }, jwtSecret, { expiresIn: '1h' });

		res.status(StatusCodes.ACCEPTED).json({ message: 'Login successful', token, user });

	} catch (error) {
		console.error('Error during login:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error during login' });
	}
};

export const retriveUser = async (req: Request, res: Response) => {

	const { user } = req.body;

	if (!user) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request' });
      }

	try {
		const result = await userService.getUserById(user.userId);
            res.status(StatusCodes.OK).json({ message: 'Succesfully received data ', data: result });

	} catch (error) {
		console.error('Error during login:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error during retrieving user' });
	}
};