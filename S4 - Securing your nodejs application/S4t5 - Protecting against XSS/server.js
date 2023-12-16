const express = require('express');
const app = express();
const blogRouter = require('./routes/blog.route');
const authRouter = require('./routes/auth.route');
const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const { cspOptions } = require('./config/config');

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(express.json());

//security
app.use(xss());
app.use(helmet.contentSecurityPolicy(cspOptions));
app.use(blogRouter);
app.use(authRouter);

// path not found 404
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
