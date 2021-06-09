const express = require('express');
const { insertNewPost, viewAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/post', authMiddleware, insertNewPost);
router.get('/post', authMiddleware, viewAllPosts);

module.exports = router;
