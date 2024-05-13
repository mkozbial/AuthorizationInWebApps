import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
	StatusCodes,
} from 'http-status-codes';

// Secret key for JWT verification
const jwtSecret = process.env.JWT_SECRET;


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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

    req.body.user = decoded;
    next();
  });
};