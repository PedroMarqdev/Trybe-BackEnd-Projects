const { ObjectId } = require('mongodb');
const conn = require('./connection');

const insertNewRecipe = async (recipe) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('recipes').insertOne({ ...recipe }));
  return { recipe: { ...recipe, _id: insertedId } };
};

const findAllRecipes = async () => {
  const result = await conn().then((db) =>
    db.collection('recipes').find({}).toArray());
  return result;
};

const findRecipeById = async (id) => {
  const result = await conn().then((db) =>
    db.collection('recipes').findOne({ _id: id }));
  return result;
};
const updateRecipeById = async (id, recipe, authorId) => {
  const { name, ingredients, preparation } = recipe;
  await conn().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: id }, { $set: { name, ingredients, preparation } }));
  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId: authorId,
  };
};

const deleteRecipeById = async (id) => {
  await conn().then((db) => db.collection('recipes').deleteOne({ _id: id }));
};

const insertNewImageOnRecipeById = async (id, image) => {
  await conn().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: id }, { $set: { image } }));
  const result = await findRecipeById(new ObjectId(id));
  return ({ ...result, image });
};
module.exports = {
  insertNewRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipeById,
  deleteRecipeById,
  insertNewImageOnRecipeById,
};
