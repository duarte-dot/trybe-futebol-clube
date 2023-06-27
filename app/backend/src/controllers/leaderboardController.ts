import { Request, Response } from 'express';
import { ITeams } from '../Interfaces/ITeams';
import TeamService from '../services/teamsServices';
import * as leaderboardServices from '../services/leaderboardServices';
import sort from '../utils/sort';

const INTERNAL_SERVER_ERROR = 'Internal server error';

async function getHomeMatches(_req: Request, res: Response) {
  try {
    const allTeams = await TeamService.getAllTeams();
    const homeMatch = await Promise.all(
      allTeams.map(async (team: ITeams) =>
        leaderboardServices.getHomeMatches(team.id || 0)),
    );
    return res.status(200).json(sort(homeMatch));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
}

async function getAwayMatches(_req: Request, res: Response) {
  try {
    const allTeams = await TeamService.getAllTeams();
    const awayMatch = await Promise.all(
      allTeams.map(async (team: ITeams) =>
        leaderboardServices.getAwayMatches(team.id || 0)),
    );
    return res.status(200).json(sort(awayMatch));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
}

async function getMatches(_req: Request, res: Response) {
  try {
    const allTeams = await TeamService.getAllTeams();
    const allFinishedMatches = await Promise.all(
      allTeams.map(async (team: ITeams) =>
        leaderboardServices.getMatches(team.id || 0)),
    );
    return res.status(200).json(sort(allFinishedMatches));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
}

export {
  getHomeMatches,
  getAwayMatches,
  getMatches,
};
