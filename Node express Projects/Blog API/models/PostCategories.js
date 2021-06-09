module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostsCategories', {},
  { timestamps: false });
  PostCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategories;
};