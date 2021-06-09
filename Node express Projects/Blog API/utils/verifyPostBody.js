const verifyCategoryField = async (Category, id) => {
  const result = await Category.findByPk(id);
  if (!result) throw new Error('"categoryIds" not found');
};
const verifyPostFields = async (body, Category) => {
  if (!body.title) throw new Error('"title" is required');
  if (!body.content) throw new Error('"content" is required');
  if (!body.categoryIds) throw new Error('"categoryIds" is required');
  const checkAllCategoryField = body.categoryIds.map((categoryId) =>
    verifyCategoryField(Category, categoryId));
  await Promise.all(checkAllCategoryField);
};

module.exports = verifyPostFields;