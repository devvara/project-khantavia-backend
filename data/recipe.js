import { Op } from 'sequelize' ;
import { db } from "../db/database.js";
import Recipe from "../model/recipe.js";

const SELECT_RECIPE = "SELECT * FROM recipe";
const SELECT_TOTAL_CNT_RECIPE = "SELECT count(*) as cnt FROM recipe";

export async function getRecipeTotalCnt() {
  return db
    .execute(`${SELECT_TOTAL_CNT_RECIPE}`) //
    .then((result) => result[0]);
}

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

export async function getRecipeById(id) {
  return db
    .execute(`${SELECT_RECIPE} WHERE id = ${id}`)
    .then((result) => result[0]);
}