const conn = require('./connection');

const insertNewProduct = async (name, quantity) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const findAll = async () => {
  const result = await conn().then((db) => db.collection('products').find().toArray());
  return JSON.stringify({ products: [...result] });
};

const findById = async (id) => {
  const result = await conn()
    .then((db) => db.collection('products').find({ _id: id }).toArray());
  return result[0];
};

const updateById = async (id, name, quantity) => {
  await conn()
    .then((db) => db.collection('products')
      .updateOne({ _id: id }, {$set: { name: name, quantity: quantity}}));
  return {
    _id: id,
    name,
    quantity,
  };;
};

const removeById = async (id) => {
  const result = await findById(id);
  await conn().then((db) => db.collection('products').deleteOne({ _id: id }));
  return result;
};

const verifyName = async (name) => {
  const emptyResult = 0;
  const result = await conn().then((db) =>
    db.collection('products').find({ name: name }).toArray(),
  );
  return result.length !== emptyResult ? true : false;
};

module.exports = {
  insertNewProduct,
  verifyName,
  findAll,
  findById,
  updateById,
  removeById,
};
