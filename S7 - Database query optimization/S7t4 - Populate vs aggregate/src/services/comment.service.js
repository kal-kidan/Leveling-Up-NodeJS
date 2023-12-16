const { Blog } = require('../models');

const addComment = async (blogId, comments) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId },
    { $push: { comments } },
    { new: true },
  );
  return blog;
};

module.exports = {
  addComment,
};
