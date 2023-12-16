const express = require('express');
const httpStatus = require('http-status');
const passport = require('passport');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const blogRouter = require('../routes/blog.route');
const authRouter = require('../routes/auth.route');
const commentRouter = require('../routes/comment.route');
const { errorHandler, errorConverter } = require('../middlewares/error');
const ApiError = require('../utils/ApiError');
const morgan = require('../config/morgan');
const { jwtStrategy } = require('../config/passport');
const { cspOptions, env } = require('../config/config');

module.exports = async (app) => {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);

  // jwt authentication
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  app.use(express.json());

  // security
  app.use(xss());
  app.use(
    helmet({
      contentSecurityPolicy: cspOptions,
    }),
  );
  app.use(mongoSanitize());

  if (env === 'production') {
    app.use(cors({ origin: 'url' }));
    app.options('*', cors({ origin: 'url' }));
  } else {
    // enabling all cors
    app.use(cors());
    app.options('*', cors());
  }

  app.use(blogRouter);
  app.use(authRouter);
  app.use(commentRouter);
  // path not found 404
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  app.use(errorConverter);
  app.use(errorHandler);
  return app;
};
