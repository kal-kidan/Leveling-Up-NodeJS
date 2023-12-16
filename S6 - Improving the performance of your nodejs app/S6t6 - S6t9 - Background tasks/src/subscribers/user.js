const transporter = require('../utils/email-transporter');
const config = require('../config/config');

const signUp = async (user) => {
  await transporter.sendMail({
    from: config.email,
    to: user.email,
    subject: 'Successfuly registered',
    text: 'Thanks for signing up',
  });
};

module.exports = {
  signup: signUp,
};
