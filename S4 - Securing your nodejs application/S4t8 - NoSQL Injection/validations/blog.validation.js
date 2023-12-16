const joi = require('joi');
const { objectId } = require('./custom.validation');
const createBlogSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    createdBy: joi.string().custom(objectId).required(),
  }),
};

const getBlogSchema = {
  body: joi.object().keys({
    userId: joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createBlogSchema,
  getBlogSchema,
};
