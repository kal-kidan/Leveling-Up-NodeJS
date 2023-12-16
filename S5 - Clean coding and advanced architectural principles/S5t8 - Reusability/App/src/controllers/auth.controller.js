const httpStatus = require('http-status');
const TokenService = require('kal-token');
const catchAsync = require('../utils/catchAsync');

const Token = require('../models/token.model');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');

const tokenService = new TokenService(Token, tokenTypes, config);

const { userService, authService } = require('../services');

const register = catchAsync(async (req, res) => {
  // create a user
  const user = await userService.createUser(req.body);
  // generate token
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(
    email,
    password,
    req.connection.remoteAddress,
  );
  // generate token
  const tokens = await tokenService.generateAuthTokens(user.id);
  res.status(httpStatus.OK).send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuthToken(req.body.refreshToken);
  res.status(httpStatus.OK).send({ ...tokens });
});

module.exports = {
  register,
  login,
  refreshToken,
};
