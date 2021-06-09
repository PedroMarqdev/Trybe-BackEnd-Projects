const express = require('express');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const postRoute = require('./routes/postRoute');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoute);
app.use(categoryRoute);
app.use(postRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
