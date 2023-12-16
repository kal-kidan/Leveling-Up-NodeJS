const { Blog } = require('./../models');
const createBlog = async (body) => {
  await Blog.create(body);
};

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = {
  createBlog,
  getBlogs,
};
