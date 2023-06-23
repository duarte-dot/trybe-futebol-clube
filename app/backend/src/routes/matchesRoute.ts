import { Router } from 'express';

import matchesController from '../controllers/matchesControllers';

const matchesRoute = Router();

matchesRoute.get('/', matchesController.getAllMatches);

export default matchesRoute;
