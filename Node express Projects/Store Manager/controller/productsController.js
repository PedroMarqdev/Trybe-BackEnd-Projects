const { StatusCodes } = require('http-status-codes');
const productsService = require('../service/productsService.js');

const insertNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const result = await productsService.insertNewProduct(name, quantity);
    res.status(StatusCodes.CREATED).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(message);
  }
};

const findAll = async (_req, res) => {
  const result = await productsService.findAll();
  res.status(StatusCodes.OK).send(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsService.findById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(await JSON.parse(message));
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await productsService.updateById(id, name, quantity);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(await JSON.parse(message));
  }
};

const removeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsService.removeById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({message}) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(await JSON.parse(message));
  }
};
module.exports = {
  insertNewProduct,
  findAll,
  findById,
  updateById,
  removeById,
};
