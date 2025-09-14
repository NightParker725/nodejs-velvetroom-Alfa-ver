import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    const decoded = jwt.verify(token, secret) as any; // { id, email, roles, iat, exp }
    (req as any).decoded = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}
