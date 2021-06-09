const { StatusCodes } = require('http-status-codes');
const salesService = require('../service/salesService.js');

const insertNewSale = async (req, res) => {
  try {
    const result = await salesService.insertNewSale(req.body);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    const parseJSONerror = await JSON.parse(message);
    const messageError = parseJSONerror.err.code;
    if (messageError === 'stock_problem')
      return res.status(StatusCodes.NOT_FOUND).json(parseJSONerror);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(parseJSONerror);
  }
};

const findAll = async (_req, res) => {
  const result = await salesService.findAll();
  res.status(StatusCodes.OK).send(result);
};
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await salesService.findById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.NOT_FOUND).send(message);
  }
};
const updateById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await salesService.updateById(id, req.body);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    const parseJSONerror = await JSON.parse(message);
    const messageError = parseJSONerror.err.code;
    if (messageError === 'stock_problem')
      return res.status(StatusCodes.NOT_FOUND).json(parseJSONerror);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(parseJSONerror);
  }
};
const removeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await salesService.removeById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({message}) {
    const parseJSONerror = await JSON.parse(message);
    const messageError = parseJSONerror.err.code;
    if (messageError === 'stock_problem')
      return res.status(StatusCodes.NOT_FOUND).json(parseJSONerror);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(parseJSONerror);
  }
};
module.exports = {
  insertNewSale,
  findAll,
  findById,
  updateById,
  removeById,
};