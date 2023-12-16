const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-status');
const { userService, tokenService } = require('./../services');
const register = catchAsync(async (req, res) => {
  // create a user
  const user = await userService.createUser(req.body);
  // generate token
  const token = await tokenService.generateAuthToken(user._id);
  res.status(httpStatus.CREATED).send({ user, token });
});

module.exports = {
  register,
};
