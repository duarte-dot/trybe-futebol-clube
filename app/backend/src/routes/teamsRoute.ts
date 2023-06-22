import { Router } from 'express';

import teamsController from '../controllers/teamsControllers';

const teamsRoute = Router();

teamsRoute.get('/', teamsController.getAllTeams);
teamsRoute.get('/:id', teamsController.selectTeam);

export default teamsRoute;
