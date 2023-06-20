import { Router } from 'express';

import teamsController from '../controllers/teamsControllers';

const teamsRoute = Router();

teamsRoute.get('/', teamsController.getAllTeams);

export default teamsRoute;
