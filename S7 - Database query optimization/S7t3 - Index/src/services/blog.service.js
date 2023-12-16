const fs = require('fs');
const httpStatus = require('http-status');
const sharp = require('sharp');

const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

const createBlog = async (body, userId) => {
  await Blog.create({ ...body, createdBy: userId });
};

const getBlogs = async () => {
  const blogs = await Blog.find()
    .sort({
      createdAt: -1,
    })
    .limit(10);
  // .lean();
  return blogs;
};

const searchBlogs = async (searchQuery) => {
  const blogs = await Blog.find({ $text: { $search: searchQuery } });
  return blogs;
};

const getReadableFileStream = async (filename) => {
  const filePath = `${__dirname}/../../uploads/${filename}`;
  if (!fs.existsSync(filePath)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const stream = fs.createReadStream(filePath);
  return stream;
};

const uploadFile = async (file) => {
  const filename = `image-${Date.now()}.webp`;
  const outputPath = `${__dirname}/../../uploads/${filename}`;
  sharp(file.buffer).resize(600).webp({ quality: 80 }).toFile(outputPath);
  return filename;
};
module.exports = {
  createBlog,
  getBlogs,
  getReadableFileStream,
  uploadFile,
  searchBlogs,
};
