const express = require('express');
const {
  insertNewUser,
  loginUser,
  getUsers,
  getUserById,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// middleware that is specific to this router
router.post('/user', insertNewUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUsers);
router.get('/user/:id', authMiddleware, getUserById);

module.exports = router;
