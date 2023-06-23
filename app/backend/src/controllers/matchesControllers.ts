import { Request, Response } from 'express';
import * as matchesServices from '../services/matchesServices';

async function getAllMatches(req: Request, res: Response) {
  try {
    const { inProgress } = req.query;
    if (inProgress && inProgress === 'true') {
      const matches = await matchesServices.getInProgressMatches();
      return res.status(200).json(matches);
    }
    if (inProgress && inProgress === 'false') {
      const matches = await matchesServices.getFinishedMatches();
      return res.status(200).json(matches);
    }

    const matches = await matchesServices.getAllMatches();

    return res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    // return res.status(500).json({ message: err.message });
  }
}

export default { getAllMatches };
