const express = require('express');
const { insertNewCategory, findAllCategories } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/categories', authMiddleware, insertNewCategory);
router.get('/categories', authMiddleware, findAllCategories);

module.exports = router;
