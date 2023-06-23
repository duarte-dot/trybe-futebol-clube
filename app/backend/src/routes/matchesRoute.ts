import { Router } from 'express';

import tokenMiddleware from '../middlewares/tokenMiddleware';
import matchesController from '../controllers/matchesControllers';

const matchesRoute = Router();

matchesRoute.get('/', matchesController.getAllMatches);
matchesRoute.patch('/:id/finish', tokenMiddleware, matchesController.finishMatch);
matchesRoute.patch('/:id', tokenMiddleware, matchesController.updateMatch);
matchesRoute.post('/', tokenMiddleware, matchesController.createMatch);

export default matchesRoute;
