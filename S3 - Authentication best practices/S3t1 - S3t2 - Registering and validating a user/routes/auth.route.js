const express = require('express');
const router = express.Router();
const validate = require('./../middlewares/validate');
const { userValidation } = require('./../validations');
const { authController } = require('./../controllers');
router.post(
  '/auth/register',
  validate(userValidation.createUserSchema),
  authController.register
);

module.exports = router;
