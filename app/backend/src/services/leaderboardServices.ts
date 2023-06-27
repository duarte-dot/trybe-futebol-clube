import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { ILeaderboard } from '../Interfaces/ILeaderboard';

type calcMatchesType = {
  victories: number,
  draws: number,
  goalFavor: number,
  goalOwn: number,
};

const INITIAL_STATE = {
  victories: 0,
  draws: 0,
  goalFavor: 0,
  goalOwn: 0,
};

async function calcMatches(matches: MatchesModel[], isHome: boolean): Promise<calcMatchesType> {
  return matches.reduce(
    (acc, curr) => {
      const { victories, draws, goalFavor, goalOwn } = acc;
      const homeGoals = curr.homeTeamGoals;
      const awayGoals = curr.awayTeamGoals;

      if (isHome) {
        return { victories: victories + (homeGoals > awayGoals ? 1 : 0),
          draws: draws + (homeGoals === awayGoals ? 1 : 0),
          goalFavor: goalFavor + homeGoals,
          goalOwn: goalOwn + awayGoals };
      } return { victories: victories + (homeGoals < awayGoals ? 1 : 0),
        draws: draws + (homeGoals === awayGoals ? 1 : 0),
        goalFavor: goalFavor + awayGoals,
        goalOwn: goalOwn + homeGoals,
      };
    },
    { ...INITIAL_STATE },
  );
}

async function getHomeMatches(id: number): Promise<ILeaderboard> {
  const matches = await MatchesModel.findAll({ where: { inProgress: false, homeTeamId: id } });
  const team = await TeamsModel.findByPk(id) ?? { teamName: '' };
  const { draws, victories, goalFavor, goalOwn } = await calcMatches(matches, true);

  const totalGames = matches.length;
  const totalPoints = victories * 3 + draws;
  const goalsBalance = goalFavor - goalOwn;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

  return { name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories: victories,
    totalDraws: draws,
    totalLosses: totalGames - victories - draws,
    goalsFavor: goalFavor,
    goalsOwn: goalOwn,
    goalsBalance,
    efficiency };
}

async function getAwayMatches(id: number): Promise<ILeaderboard> {
  const matches = await MatchesModel.findAll({ where: { inProgress: false, awayTeamId: id } });
  const team = await TeamsModel.findByPk(id) ?? { teamName: '' };
  const { draws, victories, goalFavor, goalOwn } = await calcMatches(matches, false);

  const totalGames = matches.length;
  const totalPoints = victories * 3 + draws;
  const goalsBalance = goalFavor - goalOwn;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

  return { name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories: victories,
    totalDraws: draws,
    totalLosses: totalGames - victories - draws,
    goalsFavor: goalFavor,
    goalsOwn: goalOwn,
    goalsBalance,
    efficiency };
}

async function getMatches(id: number): Promise<ILeaderboard> {
  const homeMatches = await getHomeMatches(id);
  const awayMatches = await getAwayMatches(id);

  return {
    name: homeMatches.name,
    totalPoints: homeMatches.totalPoints + awayMatches.totalPoints,
    totalGames: homeMatches.totalGames + awayMatches.totalGames,
    totalVictories: homeMatches.totalVictories + awayMatches.totalVictories,
    totalDraws: homeMatches.totalDraws + awayMatches.totalDraws,
    totalLosses: homeMatches.totalLosses + awayMatches.totalLosses,
    goalsFavor: homeMatches.goalsFavor + awayMatches.goalsFavor,
    goalsOwn: homeMatches.goalsOwn + awayMatches.goalsOwn,
    goalsBalance: homeMatches.goalsBalance + awayMatches.goalsBalance,
    efficiency: (
      ((homeMatches.totalPoints + awayMatches.totalPoints)
        / ((homeMatches.totalGames + awayMatches.totalGames) * 3))
      * 100
    ).toFixed(2),
  };
}

export {
  getHomeMatches,
  getAwayMatches,
  getMatches,
};
