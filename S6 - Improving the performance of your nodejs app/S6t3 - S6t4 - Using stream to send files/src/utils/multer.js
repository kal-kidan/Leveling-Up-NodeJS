const multer = require('multer');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const filePath = `${__dirname}/../../uploads`;
    cb(null, filePath);
  },
  filename(req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

module.exports = multer({
  storage,
  fileFilter(req, file, cb) {
    const maxFileSize = 3 * 1024 * 1024;
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(
        new ApiError(httpStatus.BAD_REQUEST, 'Only images are allowed'),
        false,
      );
    } else if (file.size > maxFileSize) {
      cb(
        new ApiError(httpStatus.BAD_REQUEST, 'File size should not exceed 3mb'),
        false,
      );
    } else {
      cb(null, true);
    }
  },
});
