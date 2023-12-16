const validator = require('validator');
const password = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message(
      'Password should atleast be 8 charcters with one uppercase and lowercase letter, number and special charcter'
    );
  }
  return value;
};

const objectId = (value, helpers) => {
  if (!value.match(/^[1-9a-fA-F]{24}$/)) {
    return helpers.message("'{{#label}}' must be a valid mongo id.");
  }
  return value;
};

module.exports = {
  password,
  objectId,
};
