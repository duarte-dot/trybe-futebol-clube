import { NextFunction, Request, Response } from 'express';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!regexEmail.test(req.body.email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (req.body.password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default loginMiddleware;
