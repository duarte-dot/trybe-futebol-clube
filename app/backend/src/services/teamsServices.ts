import TeamsModel from '../database/models/TeamsModel';

async function getAllTeams() {
  const allTeams = await TeamsModel.findAll();
  return allTeams;
}

async function selectTeam(id: string) {
  const team = await TeamsModel.findByPk(id);
  return team;
}

export default {
  getAllTeams,
  selectTeam,
};
