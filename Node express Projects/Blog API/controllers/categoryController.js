const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models');

const insertNewCategory = async ({ body }, res) => {
  try {
    if (!body.name) throw new Error('"name" is required');
    const result = await Category.create({ name: body.name });
    return res.status(StatusCodes.CREATED).json(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).send({ message });
  }
};

const findAllCategories = async (req, res) => {
  try {
    const result = await Category.findAll();
    return res.status(StatusCodes.OK).json(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).send({ message });
  }
};

module.exports = {
  insertNewCategory,
  findAllCategories,
};
