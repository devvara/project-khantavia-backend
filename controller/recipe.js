import * as recipeRepository from '../data/recipe.js';

export async function getRecipes(req, res) {
  const pageInfo = req.query;
  const page = parseInt(pageInfo.page);
  const pageSize = parseInt(pageInfo.pagSize);
  try {
    let start = 0;

    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }
    const data = await recipeRepository.getRecipes(page, pageSize);
  } catch (error) {
    throw error;
  }
  res.status(200).json(data);
}