const fs = require('fs');
const httpStatus = require('http-status');
const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

const createBlog = async (body, userId) => {
  await Blog.create({ ...body, createdBy: userId });
};

const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
};

const getReadableFileStream = async (filename) => {
  const filePath = `${__dirname}/../../uploads/${filename}`;
  if (!fs.existsSync(filePath)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const stream = fs.createReadStream(filePath);
  return stream;
};

module.exports = {
  createBlog,
  getBlogs,
  getReadableFileStream,
};
