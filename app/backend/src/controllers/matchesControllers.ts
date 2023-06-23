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

async function finishMatch(req: Request, res: Response) {
  const { id } = req.params;

  await matchesServices.finishMatch(Number(id));

  return res.status(200).json({ message: 'Finished' });
}

async function updateMatch(req: Request, res: Response) {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const match = await matchesServices.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

  if (!match) {
    return res.status(404).json({ message: 'Match not found' });
  }

  return res.status(200).json(match);
}

async function createMatch(req: Request, res: Response) {
  try {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const match = await matchesServices.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    if (match.status === 404) {
      return res.status(match.status).json({ message: match.message });
    }

    if (match.status === 422) {
      return res.status(match.status).json({ message: match.message });
    }

    return res.status(201).json(match.message);
  } catch (err) {
    console.error(err);
    // return res.status(500).json({ message: err.message });
  }
}

export default { getAllMatches, finishMatch, updateMatch, createMatch };
