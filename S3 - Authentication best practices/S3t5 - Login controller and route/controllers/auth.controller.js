const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-status');
const { userService, tokenService, authService } = require('./../services');
const register = catchAsync(async (req, res) => {
  // create a user
  const user = await userService.createUser(req.body);
  // generate token
  const token = await tokenService.generateAuthToken(user._id);
  res.status(httpStatus.CREATED).send({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  // generate token
  const token = await tokenService.generateAuthToken(user._id);
  res.status(httpStatus.OK).send({ user, token });
});

module.exports = {
  register,
  login,
};
