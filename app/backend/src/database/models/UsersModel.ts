import { Model, DataTypes } from 'sequelize';
import db from '.';

class UsersModel extends Model {}

UsersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validar formato de e-mail
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword: {
          // Validar critérios de senha forte
          min: 8,
          max: 50,
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: true,
        },
      },
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
);

export default UsersModel;
