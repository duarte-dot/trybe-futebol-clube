import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/auth';

const tokenMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization } = req.headers;

  if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }

  const validate = validateToken(authorization);

  if (!validate) { return res.status(401).json({ message: 'Token must be a valid token' }); }

  next();
};

export default tokenMiddleware;
