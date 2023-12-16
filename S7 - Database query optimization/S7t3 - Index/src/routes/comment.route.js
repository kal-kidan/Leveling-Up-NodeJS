const express = require('express');

const router = express.Router();
const { commentController } = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/comment', auth, commentController.addComment);

module.exports = router;
