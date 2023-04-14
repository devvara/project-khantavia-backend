import * as recipeRepository from "../data/recipe.js";

export async function getRecipes(req, res) {
  const pageInfo = req.query;
  const page = parseInt(pageInfo.page);
  const pageSize = parseInt(pageInfo.pageSize);
  const category = pageInfo.category;
  
  try {
    let start = 0;
    let categoryItem = category ??  '';

    if (page <= 0) {
      start = 1;
    } else {
      start = (page - 1) * pageSize;
    }

    const total = await recipeRepository.getRecipeTotalCnt();

    if (page > Math.round(total[0].cnt / pageSize)) {
      res.status(200).json([]);
    }

    const data = await recipeRepository.getRecipes(start, pageSize, categoryItem);

    res.status(200).json(data);
  } catch (error) {
    throw error;  
  }
}
