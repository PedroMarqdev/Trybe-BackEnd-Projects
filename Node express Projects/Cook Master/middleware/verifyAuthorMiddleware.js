const { ObjectId } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const recipeModel = require('../model/recipeModel');

const verifyAuthorMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  if (role === 'admin') return next();

  const result = await recipeModel.findRecipeById(new ObjectId(id));
  if (result === null) res.status(StatusCodes.NOT_FOUND).send({ message: 'recipe not found' });
  if (result.userId.toString() !== _id.toString()) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: 'Você não é o autor da receita.' });
  }
  next();
};

module.exports = verifyAuthorMiddleware;