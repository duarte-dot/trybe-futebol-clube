import jwt = require('jsonwebtoken');
import { SignOptions } from 'jsonwebtoken';
import IJWTPayload from '../Interfaces/IJWTPayload';

const SECRET: string = process.env.JWT_SECRET || 'secret';

const config: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (payload: IJWTPayload): string => {
  const token = jwt.sign(payload, SECRET, config);
  return token;
};

const validateToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) { return false; }
};

export { generateToken, validateToken };
