const express = require('express');
const { insertNewSale, findAll, findById, updateById, removeById } 
  = require('../controller/salesController');

const salesRouter = express.Router();

salesRouter.get('/sales', findAll);
salesRouter.get('/sales/:id', findById);
salesRouter.post('/sales', insertNewSale);
salesRouter.put('/sales/:id', updateById);
salesRouter.delete('/sales/:id', removeById);

module.exports = salesRouter;
