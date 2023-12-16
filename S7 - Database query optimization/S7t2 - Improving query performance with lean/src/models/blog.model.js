const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      get(value) {
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      },
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [commentSchema],
  },
  { toJSON: { getters: true } },
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
