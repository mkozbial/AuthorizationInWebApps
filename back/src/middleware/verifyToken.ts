import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key for JWT verification
const jwtSecret = process.env.JWT_SECRET;


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!jwtSecret) {
      return res.status(401).json({ message: 'No secret provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.body.user = decoded;
    next();
  });
};