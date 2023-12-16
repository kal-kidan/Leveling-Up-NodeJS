const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const config = require('./../config/config');
const { tokenTypes } = require('./../config/tokens');
const generateAuthToken = (userId) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: dayjs()
      .add(config.jwt.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes')
      .unix(),
    type: tokenTypes.ACCESS,
  };

  return jwt.sign(payload, config.jwt.secret);
};

module.exports = {
  generateAuthToken,
};
