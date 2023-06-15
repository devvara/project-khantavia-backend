import SQ, { Op } from 'sequelize';
import { sequelize } from "../db/database.js";
const DataTypes = SQ.DataTypes;

// Defined the Sequlize model
const Notice = sequelize.define('notice', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
 }, {
    tableName: 'notice',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


/**
 * Find all notices
 * @returns {Promise<object|null>}
 */
export async function getNotices() {
  return Notice.findAll();
}