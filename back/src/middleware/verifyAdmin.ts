import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';
import {
	StatusCodes,
} from 'http-status-codes';
import { userService } from 'services/userService';

export const verifyAdmin= (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No token provided' });
      }

      if (!jwtSecret) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server secret is not provided' });
      }

      jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                  return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
            }

            if (!decoded){
                  return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
            }
            
            //const user = JSON.parse(decoded);
            console.log(decoded);

            req.body.user = decoded;
            next();
      });
};