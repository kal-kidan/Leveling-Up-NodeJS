const { Blog } = require('../models');

const createBlog = async (body, userId) => {
  await Blog.create({ ...body, createdBy: userId });
};

const getBlogs = async (userId) => {
  const blogs = await Blog.find({ createdBy: userId });
  return blogs;
};

module.exports = {
  createBlog,
  getBlogs,
};
