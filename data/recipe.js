import SQ, { Op } from 'sequelize' ;
import { sequelize } from "../db/database.js";
const DataTypes = SQ.DataTypes;

// Defined the Sequlize model
const Recipe = sequelize.define('recipe', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  RCP_NM: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  RCP_PARTS_DTLS: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  RCP_PAT2: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  RCP_WAY2: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  RCP_SEQ: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  INFO_NA: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  INFO_WGT: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  INFO_PRO: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  INFO_FAT: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  INFO_CAR: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  INFO_ENG: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  HASH_TAG: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ATT_FILE_NO_MK: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ATT_FILE_NO_MAIN: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL01: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL02: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL03: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL04: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL05: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL06: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL07: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL08: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL09: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL10: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL11: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL12: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL13: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL14: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL15: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL16: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL17: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL18: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL19: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL20: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  MANUAL_IMG01: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG02: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG03: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG04: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG05: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG06: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG07: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG08: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG09: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG10: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG11: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG12: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG13: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG14: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG15: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG16: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG17: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG18: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG19: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  MANUAL_IMG20: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'recipe',
  timestamps: false,
  indexes: [
    {
      name: 'recipe_rcp_way2',
      fields: ['RCP_WAY2'],
    },
    {
      name: 'recipe_rcp_pat2',
      fields: ['RCP_PAT2'],
    },
    {
      name: 'recipe_hash_tag',
      fields: ['HASH_TAG'],
    },
  ],
});

/**
 * Find all recipes
 * @param {number} pageNum 
 * @param {number} pageSize 
 * @param {string} categoryItem 
 * @param {string} filter 
 * @param {string} search 
 * @returns {Promise<Array<object>>}
 */
export async function getRecipes(pageNum, pageSize, categoryItem, filter, search) {
  const offset = pageNum > 1 ? (pageNum - 1) * pageSize : 0;
  const limit = pageSize;

  const whereClause = {};

  if (categoryItem) {
    whereClause.RCP_PAT2 = categoryItem;
  }

  if (filter) {
    whereClause.RCP_WAY2 = { [Op.in]: [filter.split(",")] };
  }

  if (search) {
    whereClause.RCP_NM = { [Op.like]: `%${search}%` };
  }

  try {
    const recipes = await Recipe.findAll({
      where: whereClause,
      offset: offset,
      limit: limit,
    });
    return recipes;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Find a recipe by id
 * @param {number} id 
 * @returns {Promise<object|null>}
 */
export async function getRecipeById(id) {
  return await Recipe.findOne({
    where: { id },
  });
}