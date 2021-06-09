const { ObjectId } = require('mongodb');
const salesModel = require('../model/salesModel.js');
const { 
  wrongIdOrQuantityError, 
  saleNotFoundError, 
  saleIdFormatError, 
  stockQuantityError 
} = require('../errors/errors.js');
const productsModel = require('../model/productsModel');


const verifySale = async (productId, quantity) => {
  const noSenseStock = 0;
  const result = await productsModel.findById(new ObjectId(productId));

  if(result.quantity - quantity <= noSenseStock)
    throw new Error(JSON.stringify(stockQuantityError));
  if(!result) 
    throw new Error(JSON.stringify(wrongIdOrQuantityError));
  if(quantity <= noSenseStock)
    throw new Error(JSON.stringify(wrongIdOrQuantityError));
  if (typeof quantity !== 'number') 
    throw new Error(JSON.stringify(wrongIdOrQuantityError));
};

const verifyAllSales = async (sales) => {
  const verifyMap = sales.map(({productId, quantity}) => {
    return verifySale(productId, quantity);
  });
  await Promise.all(verifyMap);
};
const verifyId = async (id, error) => {
  if (!ObjectId.isValid(id)) throw new Error((JSON.stringify(error)));
  const result = await salesModel.findById(new ObjectId(id));
  console.log(result);
  const emptyValue = 0;
  if (result.length === emptyValue) throw new Error(JSON.stringify(error));
  return result;
};

const insertNewSale = async (sales) => {
  await verifyAllSales(sales);
  return salesModel.insertNewSale(sales);
};

const findAll = async () => {
  const result = await salesModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = verifyId(id, saleNotFoundError);
  return result;
};

const updateById = async (id, sales) => {
  await verifyId(id, wrongIdOrQuantityError);
  await verifyAllSales(sales);
  return salesModel.updateById(new ObjectId(id), sales);
  
};

const removeById = async (id) => {
  await verifyId(id, saleIdFormatError);
  return salesModel.removeById(new ObjectId(id));
};

module.exports = {
  insertNewSale,
  findAll,
  findById,
  updateById,
  removeById,
};