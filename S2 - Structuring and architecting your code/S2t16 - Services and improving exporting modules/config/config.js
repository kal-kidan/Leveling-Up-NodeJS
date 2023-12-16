require('dotenv').config();
const { envValidation } = require('./../validations');
const { value: envVars, error } = envValidation.validate(process.env);
const logger = require('./logger');
if (error) {
  logger.error(error);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.NODE_ENV,
};
