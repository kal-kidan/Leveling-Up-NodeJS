const express = require('express');
const router = express.Router();
const { blogValidation } = require('./../validations');
const validate = require('./../middlewares/validate');
const { blogController } = require('./../controllers');
const auth = require('./../middlewares/auth');
router.get(
  '/blogs',
  auth,
  validate(blogValidation.getBlogSchema),
  blogController.getBlogs
);
router.post(
  '/blog',
  auth,
  validate(blogValidation.createBlogSchema),
  blogController.createBlog
);

module.exports = router;
