const express = require('express');
const upload = require('../utils/multer');

const router = express.Router();
const { blogValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { blogController } = require('../controllers');
const auth = require('../middlewares/auth');
const getRecentBlogCache = require('../middlewares/caches/recent-blogs');

router.get('/blogs', auth, getRecentBlogCache, blogController.getRecentBlogs);
router.post(
  '/blog',
  auth,
  validate(blogValidation.createBlogSchema),
  blogController.createBlog,
);

router.post(
  '/blog/cover-image',
  auth,
  upload.single('coverImage'),
  blogController.uploadFile,
);

router.get('/blog/image/:filename', blogController.getFile);

module.exports = router;
