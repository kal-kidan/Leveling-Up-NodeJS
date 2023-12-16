const ApiError = require('./../utils/ApiError');
const httpStatus = require('http-status');
const verifyCallBack = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'please authenticate'));
  }

  req.user = user;
  resolve();
};

const passport = require('passport');
const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallBack(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

module.exports = auth;
