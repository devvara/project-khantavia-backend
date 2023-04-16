import { db } from "../db/database.js";

const SELECT_RECIPE = "SELECT * FROM recipe";
const SELECT_TOTAL_CNT_RECIPE = "SELECT count(*) as cnt FROM recipe";

export async function getRecipeTotalCnt() {
  return db
    .execute(`${SELECT_TOTAL_CNT_RECIPE}`) //
    .then((result) => result[0]);
}

export async function getRecipes(pageNum, pageSize, categoryItem, search) {
  return db
    .execute(
      `${SELECT_RECIPE} ${
        categoryItem ? `WHERE RCP_PAT2 = '${categoryItem}'` : ""
      } ${
        search
          ? categoryItem
            ? `AND RCP_NM LIKE '%${search}%'`
            : `WHERE RCP_NM LIKE '%${search}%'`
          : ""
      } LIMIT ${pageNum}, ${pageSize}`
    ) //
    .then((result) => result[0]);
}
