import express from 'express';
import 'express-async-errors';
import * as recipeController from '../controller/recipe.js';
const router = express.Router();

// GET /recipes
router.get('/', recipeController.getRecipes);

export default router;