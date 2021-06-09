const { StatusCodes } = require('http-status-codes');
const { BlogPost, Category, PostsCategories, User } = require('../models');
const verifyPostFields = require('../utils/verifyPostBody');

const insertNewPost = async ({ body, user }, res) => {
  try {
    await verifyPostFields(body, Category);
    const { title, content, categoryIds } = body;
    const result = await BlogPost.create({
      title,
      content,
      published: Date.now(),
      updated: Date.now(),
      userId: user.dataValues.id });
    if (result) {
      const allCategoryIds = categoryIds.map((id) =>
        PostsCategories.create({ postId: result.id, categoryId: id }));
      await Promise.all(allCategoryIds);
    }
    res.status(StatusCodes.CREATED).json(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};
const viewAllPosts = async (req, res) => {
  try {
    const result = await BlogPost.findAll({
      include: [{ model: User, as: 'user' }, 
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    res.status(StatusCodes.OK).json(result);
  } catch ({ message }) {
    res.status(StatusCodes.BAD_REQUEST).json({ message });
  }
};
module.exports = {
  insertNewPost,
  viewAllPosts,
};
