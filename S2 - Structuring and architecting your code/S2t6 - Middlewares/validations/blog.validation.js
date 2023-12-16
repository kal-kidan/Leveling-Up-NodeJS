const joi = require('joi');
const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
  }),
};

module.exports = {
  createBlogSchema,
};
