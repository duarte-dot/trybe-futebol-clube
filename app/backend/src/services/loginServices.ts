import * as bcrypt from 'bcryptjs';
import { generateToken, validateToken } from '../utils/auth';
import UsersModel from '../database/models/UsersModel';

async function login(email: string, password: string) {
  const user = await UsersModel.findOne({ where: { email } });

  if (!user) {
    return { status: 401, message: 'Invalid email or password' };
  }

  if (!bcrypt.compareSync(password, user.dataValues.password)) {
    return { status: 401, message: 'Invalid email or password' };
  }

  const token = generateToken({ email, role: user.dataValues.role });

  return {
    status: 200,
    token,
  };
}

async function role(authorization: string) {
  const user = validateToken(authorization);

  if (!user) return { status: 401, message: 'Token must be a valid token' };

  return { status: 200, role: JSON.parse(JSON.stringify(user)).role };
}

export { login, role };
