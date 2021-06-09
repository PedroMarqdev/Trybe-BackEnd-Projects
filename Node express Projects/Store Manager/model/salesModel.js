const conn = require('./connection');
const { ObjectId } = require('mongodb');

const updateProdutsQuantity = async (productId, quantity, remove) => {
  if (remove) {
    return await conn().then((db) =>
      db
        .collection('products')
        .updateOne({ _id: productId }, { $inc: { quantity: -quantity } }),
    );
  }
  await conn().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: productId }, { $inc: { quantity: quantity } } ),
  );
};

const returnSalesMap = (sales, remove) =>
  sales.map(({ productId, quantity }) => {
    if (remove) return updateProdutsQuantity(new ObjectId(productId), quantity, remove);
    return updateProdutsQuantity(new ObjectId(productId), quantity);
  });
const findAll = async () => {
  const result = await conn().then((db) => db.collection('sales').find().toArray());
  return JSON.stringify({ sales: [...result] });
};

const findById = async (id) => {
  const result = await conn().then((db) => 
    db.collection('sales').find({ _id: id }).toArray());
  return result;
};
const insertNewSale = async (sales) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...sales] }),
  );
  await Promise.all(returnSalesMap(sales, 'remove'));
  return {
    _id: insertedId,
    itensSold: [...sales],
  };
};
const updateById = async (id, sales) => {
  const result = await findById(id);
  await conn().then((db) =>
    db.collection('sales').updateOne({ _id: id }, { $set: { itensSold: [...sales] } }),
  );
  await Promise.all(returnSalesMap(result[0].itensSold));
  await Promise.all(returnSalesMap(sales, 'remove'));
  return {
    _id: id,
    itensSold: [...sales],
  };
};
const removeById = async (id) => {
  const result = await findById(id);
  await conn().then((db) => db.collection('sales').deleteOne({ _id: id }));
  await Promise.all(returnSalesMap(result[0].itensSold));
  return result;
};

module.exports = {
  insertNewSale,
  findAll,
  findById,
  updateById,
  removeById,
};
