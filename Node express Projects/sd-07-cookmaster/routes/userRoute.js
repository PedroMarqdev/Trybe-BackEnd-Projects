const express = require('express');

const userRouter = express.Router();
const {
  insertNewUser,
  loginUser,
  insertNewAdminUser,
} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAdminMiddleware = require('../middleware/verifyAdminMiddleware');

const authMiddlewares = [authMiddleware, verifyAdminMiddleware];

userRouter.post('/users', insertNewUser);
userRouter.post('/users/admin', authMiddlewares, insertNewAdminUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;
