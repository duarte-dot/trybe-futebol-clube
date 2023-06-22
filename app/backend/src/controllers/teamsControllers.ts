import { Request, Response } from 'express';

import teamsServices from '../services/teamsServices';

async function getAllTeams(req: Request, res: Response) {
  const response = await teamsServices.getAllTeams();
  res.status(200).json(response);
}

async function selectTeam(req: Request, res: Response) {
  const { id } = req.params;
  const response = await teamsServices.selectTeam(id);
  res.status(200).json(response);
}

export default {
  getAllTeams,
  selectTeam,
};
