const conn = require('./connection');

const findByEmail = async (user) => {
  const { email } = user;
  const result = await conn().then((db) =>
    db.collection('users').findOne({ email }));
    return result;
};

const findByLogin = async (user) => {
  const { email, password } = user;
  const result = await conn().then((db) =>
    db.collection('users').findOne({ email, password }));
    return result;
};

const insertNewUser = async (user) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('users').insertOne({ ...user }));
    return { user: { ...user, _id: insertedId } };
};

module.exports = {
  findByEmail,
  insertNewUser,
  findByLogin,
};