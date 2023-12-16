const multer = require('multer');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const filePath = `${__dirname}/../uploads`;
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
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new ApiError(httpStatus.BAD_REQUEST, 'Only images are allowed'),
        false,
      );
    }
    cb(null, true);
  },
});
