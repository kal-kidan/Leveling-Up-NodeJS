require('dotenv').config();
const envVarSchema = require('./../validations/env.validation');
const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
  console.log(error);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
};
