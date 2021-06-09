const express = require('express');
const { 
  insertNewProduct, 
  findAll, 
  findById,
  updateById,
  removeById,
} = require('../controller/productsController.js');
const productsRouter = express.Router();

productsRouter.get('/products', findAll);
productsRouter.get('/products/:id', findById), 
productsRouter.post('/products', insertNewProduct);
productsRouter.put('/products/:id', updateById);
productsRouter.delete('/products/:id', removeById);



module.exports = productsRouter;
