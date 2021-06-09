const connection = require('./connection');

const insertMessage = async ({ chatMessage, nickname, timestamp }) => {
  console.log('entrou!');
  await connection().then((db) =>
    db
      .collection('messages')
      .insertOne({ message: chatMessage, nickname, timestamp }));
};

const findAllMessages = async () => connection().then((db) =>
    db.collection('messages').find({}).toArray());
module.exports = {
  insertMessage,
  findAllMessages,
};
