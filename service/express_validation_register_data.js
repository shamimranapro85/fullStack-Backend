const { body, validationResult } = require("express-validator");
const { res_error_handller } = require("./response_handler");

const validateLogin = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("name at least 3 character and max 31 charecter"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  body("againpassword")
    .custom((againsPass, { req }) => againsPass == req.body.password)
    .withMessage("Password not match"),
];

const runvalidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res_error_handller(res, {
        status_code: 400,
        message: errors["errors"][0].msg,
      });
      return;
    }
    next();
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = { validateLogin, runvalidation };
