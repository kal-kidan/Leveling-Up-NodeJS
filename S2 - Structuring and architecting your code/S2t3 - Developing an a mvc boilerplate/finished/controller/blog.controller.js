const Blog = require('./../models/blog.model');
const createBlog = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.send({ success: true, message: 'Blog created successfyly' });
  } catch (error) {
    res.end({ error: true, message: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.end({ error: true, message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
};
