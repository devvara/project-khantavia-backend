import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { 
    timestamps: false,
    indexes: [
      {
        name: 'user_email',
        fields: ['email'],
      },
    ]
  }
);

export async function findOne(email) {
  return await User.findOne({
    where: { email }
  });
}

export async function findById(id) {
  return await User.findByPk(id);
}

export async function createUser(user) {
  return await User.create(user).then((data) => data.dataValue.id);
}