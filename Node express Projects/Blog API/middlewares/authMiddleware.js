const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const secret = 'trybe';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: data.email, password: data.password } });
    if (user === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    }
    req.user = user;
    next();
  } catch ({ message }) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;
