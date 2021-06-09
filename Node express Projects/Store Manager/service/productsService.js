const { ObjectId } = require('mongodb');
const productsModel = require('../model/productsModel');
const {
  productExistsError,
  productNameLengthError,
  quantityLargerThanZeroError,
  quantityMustBeANumberError,
  invalidIdFormatError
} = require('../errors/errors');


const verifyProductBody = (name, quantity) => {
  const minimalLength = 5;
  const NoSenseStock = 0;
  if (name.length < minimalLength) 
    throw new Error(JSON.stringify(productNameLengthError));
  if (quantity <= NoSenseStock) 
    throw new Error(JSON.stringify(quantityLargerThanZeroError));
  if (typeof quantity !== 'number') 
    throw new Error(JSON.stringify(quantityMustBeANumberError));
};

const verifyId = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error((JSON.stringify(invalidIdFormatError)));
  const result = await productsModel.findById(new ObjectId(id));
  const emptyValue = 0;
  if (result.length === emptyValue) throw new Error(JSON.stringify(invalidIdFormatError));
  return result;
};
const insertNewProduct = async (name, quantity) => {
  const isExists = await productsModel.verifyName(name);
  if (isExists) throw new Error(JSON.stringify(productExistsError));
  verifyProductBody(name, quantity);
  return productsModel.insertNewProduct(name, quantity);
};

const findAll = async () => {
  const result = await productsModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = verifyId(id);
  return result;
};

const updateById = async (id, name, quantity) => {
  await verifyId(id);
  verifyProductBody(name, quantity);
  return productsModel.updateById(new ObjectId(id), name, quantity);
  
};

const removeById = async (id) => {
  await verifyId(id);
  return productsModel.removeById(new ObjectId(id));
};

module.exports = {
  insertNewProduct,
  findAll,
  findById,
  updateById,
  removeById,
};
