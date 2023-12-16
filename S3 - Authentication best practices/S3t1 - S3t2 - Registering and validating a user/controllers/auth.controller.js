const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-status');
const { userService } = require('./../services');
const register = catchAsync(async (req, res) => {
  // create a user
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
  // generate token
});

module.exports = {
  register,
};
