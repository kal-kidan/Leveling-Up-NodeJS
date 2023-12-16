const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const ApiError = require('../utils/ApiError');
const { ImageProcessor } = require('../background-tasks');

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body, req.user.id);
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'Blog created successfuly' });
});

const getRecentBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getRecentBlogs();
  res.status(httpStatus.OK).json(blogs);
});

const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const fileName = `image-${Date.now()}.webp`;
  await ImageProcessor.Queue.add('ImageProcessorJob', {
    fileName,
    file: req.file,
  });
  res.status(httpStatus.OK).json({ fileName });
});

const getFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const stream = await blogService.getReadableFileStream(filename);
  const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
  res.setHeader('Content-Type', contentType);
  stream.pipe(res);
});

module.exports = {
  createBlog,
  getRecentBlogs,
  uploadFile,
  getFile,
};
