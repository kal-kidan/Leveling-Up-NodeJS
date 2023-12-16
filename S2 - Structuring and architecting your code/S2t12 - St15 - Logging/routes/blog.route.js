const express = require('express');
const router = express.Router();
const { createBlogSchema } = require('./../validations/blog.validation');
const validate = require('./../middlewares/validate');
const { createBlog, getBlogs } = require('./../controllers/blog.controller');
router.get('/blogs', getBlogs);
router.post('/blog', validate(createBlogSchema), createBlog);

module.exports = router;
