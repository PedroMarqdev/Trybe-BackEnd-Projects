const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('mongodb');
const recipeService = require('../service/recipeService');
const recipeModel = require('../model/recipeModel');

const insertNewRecipe = async ({ body, user }, res) => {
  const { _id } = user;
  try {
    const result = await recipeService.insertNewRecipe(body, _id);
    res.status(StatusCodes.CREATED).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

const findAllRecipes = async (req, res) => {
  const result = await recipeModel.findAllRecipes();
  return res.status(StatusCodes.OK).json(result);
};

const findRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await recipeService.findRecipeById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.NOT_FOUND).send({ message });
  }
};

const updateRecipeById = async ({ params, user, body }, res) => {
  const { id } = params;
  const { _id: authorId } = user;
  try {
    const result = await recipeService.updateRecipeById(id, body, authorId);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).send({ message });
  }
};

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;
  await recipeModel.deleteRecipeById(new ObjectId(id));
  res.status(StatusCodes.NO_CONTENT).send();
};

const insertNewImageOnRecipeById = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const path = `localhost:3000/images/${filename}`;
  const result = await recipeModel.insertNewImageOnRecipeById(id, path);
  return res.status(StatusCodes.OK).send(JSON.stringify(result));
};
module.exports = {
  insertNewRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipeById,
  deleteRecipeById,
  insertNewImageOnRecipeById,
};
