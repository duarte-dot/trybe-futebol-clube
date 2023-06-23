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

async function finishMatch(id: number) {
  const [, rowsAffected] = await MatchesModel.update(
    { inProgress: false },
    { where: { id }, returning: true },
  );

  if (+rowsAffected === 0) {
    return null;
  }
}

async function updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
  const [, rowsAffected] = await MatchesModel.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id }, returning: true },
  );

  if (+rowsAffected === 0) {
    return null;
  }

  const match = await MatchesModel.findByPk(id, {
    include: [
      { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  return match;
}

async function validateMatch(homeTeamId: number, awayTeamId: number) {
  const homeTeam = await TeamsModel.findByPk(homeTeamId);
  const awayTeam = await TeamsModel.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) {
    return { status: 404, message: 'There is no team with such id!' };
  }

  if (homeTeamId === awayTeamId) {
    return { status: 422, message: 'It is not possible to create a match with two equal teams' };
  }

  return null;
}

async function createMatch(
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) {
  const validationResult = await validateMatch(homeTeamId, awayTeamId);

  if (validationResult) {
    return validationResult;
  }

  const match = await MatchesModel.create({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });

  return { status: 201, message: match };
}

export { getAllMatches, getInProgressMatches, getFinishedMatches, finishMatch, updateMatch,
  createMatch };
