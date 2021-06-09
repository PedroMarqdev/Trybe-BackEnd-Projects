module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  return Categories;
};
