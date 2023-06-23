import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

async function getAllMatches() {
  const matches = await MatchesModel.findAll({
    include: [
      { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return matches;
}

async function getInProgressMatches() {
  const matches = await MatchesModel.findAll({
    where: { inProgress: true },
    include: [
      { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return matches;
}

async function getFinishedMatches() {
  const matches = await MatchesModel.findAll({
    where: { inProgress: false },
    include: [
      { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return matches;
}

export { getAllMatches, getInProgressMatches, getFinishedMatches };
