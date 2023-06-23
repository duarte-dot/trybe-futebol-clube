import { Model, DataTypes } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {}

MatchesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      field: 'home_team_id',
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      field: 'home_team_goals',
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      field: 'away_team_id',
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      field: 'away_team_goals',
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      field: 'in_progress',
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeamId' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId' });

export default MatchesModel;
