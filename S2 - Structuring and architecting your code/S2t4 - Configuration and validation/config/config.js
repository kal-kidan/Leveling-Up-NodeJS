const joi = require('joi');
require('dotenv').config();
const envVarSchema = joi
  .object({
    DB_CONNECTION: joi.string().required(),
    PORT: joi.number().positive().default(3000), 
  })
  .unknown();
const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
  console.log(error);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION
};
