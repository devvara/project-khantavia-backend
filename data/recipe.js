import { db } from "../db/database.js";

const SELECT_RECIPE = 'SELECT * FROM recipe LIMIT 0, 5'

export async function getRecipes(page, pageSize) {
  return db
    .execute(`${SELECT_RECIPE}`) //
    .then((result) => result[0]);
}
