const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});
const messageModel = require('./models/messageModel');
const getDate = require('./utils/getDate.js');

app.use(express.static(`${__dirname}/js`));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get('/messages', async (req, res) => {
  const result = await messageModel.findAllMessages();
  console.log(result);
  return res.status(200).send(result);
});

let clients = [];
io.on('connection', (socket) => {
  socket.on('connection', (nickname) => {
    socket.emit('retrieveUsers', clients);
    const newUser = { nickname, id: socket.id };
    clients = [...clients, newUser];
    socket.broadcast.emit('connection', newUser);
  });
  socket.on('changeNick', (nickname) => {
    clients = clients.map((el) => (el.id === socket.id ? ({ nickname, id: socket.id }) : el));
    socket.broadcast.emit('changeNick', ({ nickname, id: socket.id }));
  });
  socket.on('disconnect', () => {
    clients = clients.filter((element) => element.id !== socket.id);
    socket.broadcast.emit('disconnected', socket.id);
  });
  socket.on('message', ({ chatMessage, nickname }) => {
    messageModel.insertMessage({ chatMessage, nickname, timestamp: getDate().toLocaleString() })
      .then(io.emit('message', `${getDate().toLocaleString()} - ${nickname}: ${chatMessage}`));
    });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
