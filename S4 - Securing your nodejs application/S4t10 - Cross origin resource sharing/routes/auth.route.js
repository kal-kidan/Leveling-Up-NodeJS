const express = require('express');
const router = express.Router();
const validate = require('./../middlewares/validate');
const { userValidation, authValidation } = require('./../validations');
const { authController } = require('./../controllers');
const { authLimiter } = require('./../middlewares/authLimiter');
router.post(
  '/auth/register',
  validate(userValidation.createUserSchema),
  authController.register
);

router.post(
  '/auth/login',
  authLimiter,
  validate(authValidation.loginSchema),
  authController.login
);

router.post(
  '/auth/refresh-token',
  validate(authValidation.refreshTokenSchema),
  authController.refreshToken
);
module.exports = router;
