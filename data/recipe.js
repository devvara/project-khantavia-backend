import { db } from "../db/database.js";

const SELECT_RECIPE = 'SELECT * FROM recipe';
const SELECT_TOTAL_CNT_RECIPE = 'SELECT count(*) as cnt FROM recipe';

export async function getRecipeTotalCnt() {
  return db
    .execute(`${SELECT_TOTAL_CNT_RECIPE}`) //
    .then((result) => result[0]);
}

export async function getRecipes(page, pageSize, categoryItem) {
  return db
    .execute(`${SELECT_RECIPE} ${categoryItem ? `WHERE RCP_PAT2 = '${categoryItem}'` : ''} LIMIT ${page}, ${pageSize}`) //
    .then((result) => result[0]);
}
