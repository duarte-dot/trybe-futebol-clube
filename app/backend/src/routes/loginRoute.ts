import { Router } from 'express';

import * as loginController from '../controllers/loginController';

import loginMiddleware from '../middlewares/loginMiddleware';

const loginRoute = Router();

loginRoute.post('/', loginMiddleware, loginController.login);
loginRoute.get('/role', loginController.role);

export default loginRoute;
