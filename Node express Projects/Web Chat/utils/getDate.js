const moment = require('moment');

module.exports = () =>
  `${moment().format('L')} ${moment().format('LTS')}`
    .replace('/', '-')
    .replace('/', '-');
