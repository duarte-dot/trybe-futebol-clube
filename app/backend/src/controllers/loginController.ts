import { Request, Response } from 'express';
import * as loginServices from '../services/loginServices';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const response = await loginServices.login(email, password);

  if (response.status === 401) { return res.status(401).json({ message: response.message }); }

  return res.status(response.status).json({ token: response.token });
}

async function role(req: Request, res: Response) {
  const { authorization } = req.headers;

  if (authorization) {
    const response = await loginServices.role(authorization);

    if (response.status === 401) return res.status(401).json({ message: response.message });

    return res.status(response.status).json({ role: response.role });
  }

  return res.status(401).json({ message: 'Token not found' });
}

export { login, role };
