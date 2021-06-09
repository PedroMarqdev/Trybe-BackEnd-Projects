const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipeRouter = express.Router();
const {
  insertNewRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipeById,
  deleteRecipeById,
  insertNewImageOnRecipeById,
} = require('../controller/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAuthorMiddleware = require('../middleware/verifyAuthorMiddleware');

const authMiddlewares = [authMiddleware, verifyAuthorMiddleware];
const RECIPE_ID_ROUTE = '/recipes/:id';
const RECIPE_ROUTE = '/recipes';
const RECIPE_IMAGE_ID_ROUTE = '/recipes/:id/image';

recipeRouter.post(RECIPE_ROUTE, authMiddleware, insertNewRecipe);
recipeRouter.put(
  RECIPE_IMAGE_ID_ROUTE,
  [...authMiddlewares, upload.single('image')],
  insertNewImageOnRecipeById,
);
recipeRouter.put(RECIPE_ID_ROUTE, authMiddlewares, updateRecipeById);
recipeRouter.delete(RECIPE_ID_ROUTE, authMiddlewares, deleteRecipeById);
recipeRouter.get(RECIPE_ROUTE, findAllRecipes);
recipeRouter.get(RECIPE_ID_ROUTE, findRecipeById);

module.exports = recipeRouter;
