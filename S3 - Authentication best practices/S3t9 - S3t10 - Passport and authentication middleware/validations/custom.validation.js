const validator = require('validator');
const password = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      'Password should atleast be 8 charcters with one uppercase and lowercase letter, number and special charcter'
    );
  }
  return value;
};

module.exports = {
  password,
};
