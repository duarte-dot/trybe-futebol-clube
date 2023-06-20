import { Request, Response } from 'express';

import teamsServices from '../services/teamsServices';

async function getAllTeams(req: Request, res: Response) {
  const response = await teamsServices.getAllTeams();
  res.status(200).json(response);
}

export default {
  getAllTeams,
};
