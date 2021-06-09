const { ObjectId } = require('mongodb');
const recipeModel = require('../model/recipeModel');

const insertNewRecipe = async (recipe, authorID) => {
  const objectRecipe = recipe;
  const recipeParameters = ['preparation', 'name', 'ingredients'];
  const recipeKeys = Object.keys(objectRecipe);
  const isValidRecipe = recipeParameters.every((param) => recipeKeys.includes(param));
  objectRecipe.userId = authorID;

  if (!isValidRecipe) throw new Error('Invalid entries. Try again.');

  return recipeModel.insertNewRecipe(objectRecipe);
};
const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('recipe not found');
  const result = await recipeModel.findRecipeById(new ObjectId(id));

  if (result === null) throw new Error('recipe not found');

  return result;
};
const updateRecipeById = async (id, recipe, authorId) => {
  const recipeParameters = ['preparation', 'name', 'ingredients'];
  const recipeKeys = Object.keys(recipe);
  const isValidRecipe = recipeParameters.some((param) => recipeKeys.includes(param));
  if (!isValidRecipe) throw new Error('Invalid entries. Try again.');

  return recipeModel.updateRecipeById(new ObjectId(id), recipe, authorId);
};
module.exports = {
  insertNewRecipe,
  findRecipeById,
  updateRecipeById,
};