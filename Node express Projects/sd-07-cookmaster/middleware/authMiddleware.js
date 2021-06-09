const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const userModel = require('../model/userModel');

const secret = 'trybe';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const { data } = jwt.verify(token, secret);
    const user = await userModel.findByLogin(data);
    if (user === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Usuário não encontrado' });
    }
    req.user = user;
    next();
  } catch ({ message }) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message });
  }
};

module.exports = authMiddleware;
