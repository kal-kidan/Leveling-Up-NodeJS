const express = require('express');
const router = express.Router();
const { blogValidation } = require('./../validations');
const validate = require('./../middlewares/validate');
const { blogController } = require('./../controllers');
router.get('/blogs', blogController.getBlogs);
router.post(
  '/blog',
  validate(blogValidation.createBlogSchema),
  blogController.createBlog
);

module.exports = router;
