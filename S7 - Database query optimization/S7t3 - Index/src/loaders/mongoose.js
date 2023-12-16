const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = async () => {
  const connection = await mongoose.connect(config.dbConnection);
  return connection;
};
