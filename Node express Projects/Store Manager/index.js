const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./routes/productsRoute.js');
const salesRouter = require('./routes/salesRoute');
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(productsRoute);
app.use(salesRouter);

app.listen(PORT, () => {
  console.log('A API está no ar!');
});