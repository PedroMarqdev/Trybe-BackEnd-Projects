const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const verifyUserBody = require('../utils/verifyUserBody');
const verifyLoginBody = require('../utils/verifyLoginBody');

const jwtConfig = {
  expiresIn: 1000 * 60 * 3,
  algorithm: 'HS256',
};
const secret = 'trybe';
const insertNewUser = async (req, res) => {
  try {
    verifyUserBody(req.body);
    const { displayName, email, password, image } = req.body;
    const result = await User.create({ displayName, email, password, image });
    const token = jwt.sign({ data: result }, secret, jwtConfig);
    return res.status(StatusCodes.CREATED).json({ token });
  } catch ({ message }) {
    if (message === 'Validation error') {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'User already registered' });
    }
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await verifyLoginBody(req.body, User);
    const token = jwt.sign({ data: result }, secret, jwtConfig);
    return res.status(StatusCodes.OK).json({ token });
  } catch ({ message }) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    return res.status(StatusCodes.OK).json(result);
  } catch ({ message }) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
    console.log(result);
    if (!result) throw new Error('User does not exist');
    return res.status(StatusCodes.OK).json(result);
  } catch ({ message }) {
    return res.status(StatusCodes.NOT_FOUND).json({ message });
  }
};

module.exports = {
  insertNewUser,
  loginUser,
  getUsers,
  getUserById,
};
