import TeamsModel from '../database/models/TeamsModel';

async function getAllTeams() {
  const allTeams = await TeamsModel.findAll();
  return allTeams;
}

export default {
  getAllTeams,
};
