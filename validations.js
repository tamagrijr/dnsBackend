const { validationResult, check } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error('Bad request.');
    err.status = 400;
    err.title = 'Bad request.';
    err.errors = errors;
    return next(err);
  }
  next();
};

const validateEmailAndPassword = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .normalizeEmail(),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

const validateUser = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a First Name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Last Name"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Password"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
  ...validateEmailAndPassword,
];


module.exports = { 
  validationResult, 
  handleValidationErrors, 
  validateEmailAndPassword,
  validateUser 
};
