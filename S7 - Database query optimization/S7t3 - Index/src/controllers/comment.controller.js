const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const ApiError = require('../utils/ApiError');

const addComment = catchAsync(async (req, res) => {
  const blog = await commentService.addComment(
    req.body.blogId,
    req.body.comment,
  );

  if (blog) {
    res.json({ blog });
  } else {
    throw new ApiError('Blog not found', httpStatus.NOT_FOUND);
  }
});

module.exports = { addComment };
