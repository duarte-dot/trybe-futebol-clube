import { Model, DataTypes } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  public id!: number;

  public teamName!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

TeamsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      field: 'team_name',
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

export default TeamsModel;
