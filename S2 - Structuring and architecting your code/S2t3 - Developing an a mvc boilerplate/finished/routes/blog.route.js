const express = require('express');
const router = express.Router();

const { createBlog, getBlogs } = require('./../controller/blog.controller');
router.get('/blogs', getBlogs);
router.post('/blog', createBlog);

module.exports = router;
