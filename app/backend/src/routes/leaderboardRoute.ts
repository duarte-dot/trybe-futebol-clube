import { Router } from 'express';

import * as leaderboardController from '../controllers/leaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/', leaderboardController.getMatches);
leaderboardRoute.get('/home', leaderboardController.getHomeMatches);
leaderboardRoute.get('/away', leaderboardController.getAwayMatches);

export default leaderboardRoute;
