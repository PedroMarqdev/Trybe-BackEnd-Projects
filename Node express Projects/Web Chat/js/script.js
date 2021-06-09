const socket = window.io();
const form = document.querySelector('form');
const nickButton = document.querySelector('.nick-button');
const nickBox = document.querySelector('.nick-box');
const nick = document.querySelector('.nickname');
const messageBoxValue = document.querySelector('#message');
const DATA_TEST_ID = 'data-testid';

const generateNickFunction = () => {
  let counter = 0;
  const nickName = [];
  while (counter < 16) {
    nickName[counter] = String.fromCharCode(Math.ceil(Math.random() * 26) + 64);
    counter += 1;
  }
  return nickName.join('');
};

const insertMessagesDB = ({ message, nickname, timestamp }) => {
  const ulMessages = document.querySelector('.chat');
  const liMessage = document.createElement('li');
  liMessage.setAttribute(DATA_TEST_ID, 'message');
  liMessage.innerText = `${timestamp} - ${nickname}: ${message}`;
  ulMessages.appendChild(liMessage);
};

window.onload = async () => {
  nick.innerText = generateNickFunction();
  const result = await (await fetch('http://localhost:3000/messages')).json();
  result.forEach((messageDb) => insertMessagesDB(messageDb));
  socket.emit('connection', nick.innerText);
};

window.onbeforeunload = () => {
  socket.emit('disconnected', nick.innerText);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: nick.innerText,
    chatMessage: messageBoxValue.value,
  });
  messageBoxValue.value = '';
  return false;
});
nickButton.addEventListener('click', () => {
  nick.innerText = nickBox.value;
  socket.emit('changeNick', nick.innerText);
});

const insertMessage = (msg) => {
  const ulMessages = document.querySelector('.chat');
  const liMessage = document.createElement('li');
  liMessage.setAttribute(DATA_TEST_ID, 'message');
  liMessage.innerText = msg;
  ulMessages.appendChild(liMessage);
};

const insertNewUserOnTheList = ({ nickname, id }) => {
  const userList = document.querySelector('.user-list');
  const liUser = document.createElement('li');
  liUser.setAttribute(DATA_TEST_ID, 'online-user');
  liUser.innerText = nickname;
  liUser.id = id;
  userList.appendChild(liUser);
};

const insertAllUsers = (list) => {
  list.forEach((element) => insertNewUserOnTheList(element));
};
const desconnectedUser = (id) => {
  const userToRemove = document.querySelector(`#${id}`);
  userToRemove.remove();
};

const changeUserNick = ({ nickname, id }) => {
  console.log(id);
  const userToRemove = document.querySelector(`#${id}`);
  console.log(userToRemove);
  userToRemove.innerText = nickname;
};

socket.on('disconnected', (id) => desconnectedUser(id));
socket.on('retrieveUsers', (list) => insertAllUsers(list));
socket.on('changeNick', (user) => changeUserNick(user));
socket.on('connection', (nickname) => insertNewUserOnTheList(nickname));
socket.on('message', (messageOne) => insertMessage(messageOne));
