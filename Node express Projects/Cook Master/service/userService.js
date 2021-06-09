const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const jwtConfig = {
  expiresIn: 1000 * 60 * 3,
  algorithm: 'HS256',
};
const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const verifyValidEmail = async (user) => {
  if (!user.email 
    || !regex.test(user.email)) throw new Error('Invalid entries. Try again.');
  const isUnicEmail = await userModel.findByEmail(user);
  if (isUnicEmail !== null) throw new Error('Email already registered');
};

const insertNewUser = async (user, role) => {
  const objectUser = user;
  const userParameters = ['email', 'name', 'password'];
  const userKeys = Object.keys(objectUser);
  const isValidUser = userParameters.every((param) => userKeys.includes(param));
  objectUser.role = role;
  if (!isValidUser) throw new Error('Invalid entries. Try again.');
  await verifyValidEmail(user);
  return userModel.insertNewUser(objectUser);
};

const loginUser = async (user) => {
  const secret = 'trybe';
  const userParameters = ['email', 'password'];
  const userKeys = Object.keys(user);
  const isValidUser = userParameters.every((param) => userKeys.includes(param));
  const isUserExists = await userModel.findByLogin(user);
  if (!isValidUser) throw new Error('All fields must be filled');
  if (isUserExists === null) throw new Error('Incorrect username or password');
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return ({ token });
};

module.exports = {
  insertNewUser,
  loginUser,
};