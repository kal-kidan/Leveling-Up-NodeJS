const joi = require('joi');
const envVarSchema = joi
  .object({
    DB_CONNECTION: joi.string().required(),
    PORT: joi.number().positive().default(3000),
  })
  .unknown();
module.exports = envVarSchema;
